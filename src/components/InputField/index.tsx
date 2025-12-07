import React, { memo } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Input,
  InputSlot,
  InputField,
  Textarea,
  TextareaInput,
  HStack,
  Icon,
  AlertCircleIcon,
} from '@gluestack-ui/themed';

interface FormInputFieldProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  textContentType?: string;
  autoCorrect?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send' | 'default';
}

const FormInputField = memo(
  ({
    label,
    value,
    onChangeText,
    placeholder,
    error,
    secureTextEntry,
    multiline,
    textContentType,
    autoCorrect = true,
    autoCapitalize = 'sentences',
    returnKeyType = 'done',
  }: FormInputFieldProps) => {
    return (
      <HStack width={'100%'} padding={'$1.5'}>
        <FormControl isInvalid={!!error} width="100%">
          {label && (
            <FormControlLabel mb="$1">
              <FormControlLabelText fontSize={'$xs'}>
                {label}
              </FormControlLabelText>
            </FormControlLabel>
          )}
          {!multiline ? (
            <Input width={'100%'}>
              <InputField
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                autoCorrect={autoCorrect}
                autoCapitalize={autoCapitalize}
                returnKeyType={returnKeyType}
              />
            </Input>
          ) : (
            <Textarea h={120}>
              <TextareaInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                autoCorrect={autoCorrect}
                autoCapitalize={autoCapitalize}
                returnKeyType={returnKeyType}
              />
            </Textarea>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <FormControlError mt="$1">
              <FormControlErrorText>{error}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>
      </HStack>
    );
  },
);

export default FormInputField;
