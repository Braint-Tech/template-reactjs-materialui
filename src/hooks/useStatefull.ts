/* eslint-disable no-control-regex */
import { useCallback, useEffect, useRef, useState } from "react"
import { exists } from "tr-utils-la"

type ValidationRule = {
  rule: (val: string) => Promise<boolean>,
  message: string
}

type FormRules<Type> = {
  [k in keyof Type]?: ValidationRule[]
}

type FieldsTouched<Type> = {
  [k in keyof Type]: boolean
}

type FieldsErrors<Type> = {
  [k in keyof Type]: string | null
}

const raw = (fn: (inputValue: string) => boolean, message: string): ValidationRule => ({
  rule: async (val) => fn(val),
  message,
})

const required = (message: string): ValidationRule => ({
  rule: async (val: string) => !!val && val.length > 0 && val !== '',
  message
})

const minLength = (min: number, message: string): ValidationRule => ({
  rule: async (val) => val.length >= min,
  message
})

const maxLength = (max: number, message: string): ValidationRule => ({
  rule: async (val) => val.length < max,
  message
})

const matches = (regex: RegExp, message: string, restrict: boolean = false): ValidationRule => ({
  rule: async (val) => {
    const matched = regex.exec(val)
    if(matched){
      return restrict ? matched[0] === matched.input : true
    }
    return false
  },
  message
})

const isEmail = (message: string): ValidationRule => matches(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, message, true)

const isURL = (message: string): ValidationRule => matches(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/, message, true)

const _fieldComparison = (
  rule: (val: string) => boolean,
  message: string
): ValidationRule => ({
  rule: async (val) => rule(val),
  message
})

const _async = (fn: (val: string) => Promise<boolean>, message: string): ValidationRule => ({
  rule: async (val) => fn(val),
  message
})

type Options = {
  validateOnBlur?: boolean
  validateOnChange?: boolean,
  validateOnMount?: boolean,
  validateOnTouch?: boolean
}

type ResetExcludingOptions = {
  state?: boolean,
  errors?: boolean,
  forcedErrors?: boolean,
  touched?: boolean,
  changed?: boolean,
  blured?: boolean
}

export const useStatefull = <State extends object>(
  initialState: State,
  options: Options = {
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: false,
    validateOnTouch: false
  }
) => {

  const map = useCallback((baseObject: State, fn: (key: keyof State, val: any) => any): {[ k in keyof State ]: any } => {
    const entries = Object.entries(baseObject)
    const mapped = entries.map((e) => [e[0], fn(e[0] as keyof State, e[1] as any)])
    return Object.fromEntries(mapped)
  }, [])

  const filter = useCallback(<T extends object>(baseObject: T, fn: (key: keyof T, val: any) => boolean): {[ k in keyof Partial<T> ]: any } => {
    const entries = Object.entries(baseObject)
    const mapped = entries.filter((e) => fn(e[0] as keyof T, e[1]))
    return Object.fromEntries(mapped) as Partial<T>
  }, [])

  const [ state, setState ] = useState<State>(initialState)
  const [ errors, setErrors ] = useState<FieldsErrors<State>>(map(initialState, () => null))
  const [ forcedErrors, setForcedErrors ] = useState<Partial<FieldsErrors<State>>>(map(initialState, () => null))
  const [ touched, setTouched ] = useState<FieldsTouched<State>>(map(initialState, () => false))
  const [ changed, setChanged ] = useState<FieldsTouched<State>>(map(initialState, () => false))
  const [ blured, setBlured ] = useState<FieldsTouched<State>>(map(initialState, () => false))
  const [ _options ] = useState<Options>(options)

  const resetAll = useCallback((excluding: ResetExcludingOptions = {
    state: true,
    errors: true,
    forcedErrors: true,
    blured: true,
    changed: true,
    touched: true
  }) => {
    if(excluding.state) setState(curr => ({ ...map(curr, (_, __) => '') }))
    if(excluding.errors) setErrors(_ => ({ ...map(state, (_, __) => null) }))
    if(excluding.forcedErrors) setForcedErrors(_ => ({ ...map(state, (_, __) => null) }))
    if(excluding.touched) setTouched(_ => ({ ...map(state, (_, __) => null) }))
    if(excluding.changed) setChanged(_ => ({ ...map(state, (_, __) => null) }))
    if(excluding.blured) setBlured(_ => ({ ...map(state, (_, __) => null) }))
  }, [ map, state ])

  const formRules = useRef<FormRules<State>>(map(initialState, () => []))

  const setValidationRules = useCallback((rules: FormRules<State>) => {
    formRules.current = rules
  }, [])

  const applyFormRules = useCallback((formState: State, formRules: FormRules<State>): 
    Promise<{key: keyof typeof formState, message: string | null}[]> => {
    const rules = Object.entries(formRules) as [keyof State, ValidationRule[]][]
    return new Promise((res) => {
      const finalResult = rules.map(async ([key, payload]) => {
          let result: {key: keyof typeof formState, message: string | null} = { key, message: null }

          for(let index = 0; index < payload.length; index++){
            if(result.message !== null) break
            const { rule, message } = payload[index]
            const ruleResult = await rule(String(formState[key]))
            if(!ruleResult){
              result = { key, message }
            }
          }
          return result
        })
      Promise.all(finalResult)
      .then(r => res(r))
    })
  }, [ ])

  useEffect(() => {
    (async () => {
      const nextErrors = await applyFormRules(state, formRules.current)
      if(_options.validateOnMount){
        nextErrors.forEach(error => setErrors(current => ({ ...current, [ error.key ]: error.message })))
      }
      if(_options.validateOnTouch){
        nextErrors.forEach(error => {
          if(touched[ error.key ]){
            setErrors(current => ({ ...current, [ error.key ]: error.message }))
          }
        })
      }
      if(_options.validateOnChange){
        nextErrors.forEach(error => {
          if(touched[ error.key ] && changed[ error.key ]){
            setErrors(current => ({ ...current, [ error.key ]: error.message }))
          }
        })
      }
      if(_options.validateOnBlur){
        nextErrors.forEach(error => {
          if(blured[ error.key ]){
            setErrors(current => ({ ...current, [ error.key ]: error.message }))
          }
        })
      }
      setErrors(curr => ({ ...curr, ...filter(forcedErrors, (key, val) => val !== null) }))
    })()
  }, [ state, applyFormRules, _options, touched, changed, blured, filter, forcedErrors ])

  const validateState = useCallback(async (
      validCallback: (values: State) => void, 
      invalidCallback?: (errors: Partial<FieldsErrors<State>>) => void
    ) => {
    const nextErrors = await applyFormRules(state, formRules.current)
    const currentErrors = nextErrors.reduce((res: any, curr) => {
      return { ...res, [ curr.key ]: curr.message }
    }, {}) as FieldsErrors<State>
    nextErrors.forEach(error => setErrors(current => ({ ...current, [ error.key ]: error.message })))
    const isValid = Object.entries(currentErrors).map(e => e[1]).every(e => e === null)
    if(isValid){
      validCallback(state)
    }else{
      if(invalidCallback)
        invalidCallback(filter(currentErrors, (key, val) => val !== null && val !== undefined ))
    }
  }, [ state, formRules, applyFormRules, filter ])

  const handleOnChange = useCallback((fieldName: keyof State, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState( current => ({ ...current, [ fieldName ]: event.target.value }))
    setChanged( current => ({ ...current, [ fieldName ]: true }))
  }, [ ])

  const handleOnFocus = useCallback((fieldName: keyof State) => setTouched(current => ({ ...current, [ fieldName ]: true })), [])

  const handleOnBlur = useCallback((fieldName: keyof State) => setBlured(current => ({ ...current, [ fieldName ]: true })), [])

  const getInputValue = useCallback((fieldName: keyof State) => state[ fieldName ] ?? '', [ state ])

  const hasError = useCallback((fieldName: keyof State) => !!errors[ fieldName ], [ errors ])

  const getHelperText = useCallback((fieldName: keyof State, defaultValue: '' | ' ' = ' ') => !!errors[ fieldName ] ? errors[ fieldName ] : (!!defaultValue ? defaultValue : ''), [ errors ])

  const getProps = useCallback((fieldName: keyof State, lightMode: boolean = false) => ({
    onChange: (e: any) => handleOnChange(fieldName, e),
    onFocus: () => handleOnFocus(fieldName),
    onBlur: () => handleOnBlur(fieldName),
    value: getInputValue(fieldName),
    ...(
      lightMode ?
      {} :
      {
        error: hasError(fieldName),
        helperText: getHelperText(fieldName)
      }
    )
  }), [ handleOnChange, handleOnFocus, handleOnBlur, getInputValue, hasError, getHelperText ])

  const hasErrors = useCallback(async () => {
    const currentErrors = (await applyFormRules(state, formRules.current))
      .reduce((res: any, curr) => ({ ...res, [ curr.key ]: curr.message }), {})
    return exists(filter(currentErrors, (key, val) => val !== null)) || exists(filter(forcedErrors, (key, val) => val !== null))
  }, [ applyFormRules, state, filter, forcedErrors ])

  return {
    getState: () => state,
    setState,
    getErrors: () => errors,
    setErrors,
    getTouched: () => touched,
    setTouched,
    getChanged: () => changed,
    setChanged,
    getBlured: () => blured,
    setBlured,
    setValidationRules,
    getValidationRules: () => formRules.current,
    hasErrors,
    getProps,
    validateState,
    resetAll,
    handlers: {
      handleOnChange,
      handleOnFocus,
      handleOnBlur,
    },
    inputProps: {
      getInputValue,
      hasError,
      getHelperText
    },
    rules: {
      required,
      minLength,
      maxLength,
      isEmail,
      isURL,
      matches,
      raw,
      async: _async,
      fieldComparison: (
        fieldName: keyof State, 
        rule: (thisValue: string, otherValue: string) => boolean,
        message: string
      ) => _fieldComparison((val) => rule(val, (state as unknown as any)[ fieldName ]), message)
    }
  }
}