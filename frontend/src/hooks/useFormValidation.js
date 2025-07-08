import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

function useFormValidation(schema) {
  const formOptions = { resolver: yupResolver(schema) };
  return useForm(formOptions);
}

export default useFormValidation;