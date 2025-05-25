import { createContext, useContext, useState, ReactNode } from "react";

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;

}

interface FormContextType {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormData = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormProvider");
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "Male",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
