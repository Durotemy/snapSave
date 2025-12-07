import { useState } from 'react';

interface FormField {
  value: string;
  error: string;
}

interface UseFormInputReturn {
  value: string;
  error: string;
  setValue: (text: string) => void;
  setError: (error: string) => void;
  clearError: () => void;
  reset: () => void;
}

const useFormInput = (initialValue: string = ''): UseFormInputReturn => {
  const [formField, setFormField] = useState<FormField>({
    value: initialValue,
    error: '',
  });

  const setValue = (text: string) => {
    setFormField(prev => ({ ...prev, value: text }));
  };

  const setError = (error: string) => {
    setFormField(prev => ({ ...prev, error }));
  };

  const clearError = () => {
    setFormField(prev => ({ ...prev, error: '' }));
  };

  const reset = () => {
    setFormField({ value: initialValue, error: '' });
  };

  return {
    value: formField.value,
    error: formField.error,
    setValue,
    setError,
    clearError,
    reset,
  };
};

export default useFormInput;
