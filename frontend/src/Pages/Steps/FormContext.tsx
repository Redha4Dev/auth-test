import { createContext, useContext, useState, ReactNode } from "react";

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
  Kindergarten: {
    Name: string;
    Adress: string;
    Key: string;
    Picture: string;
    SpecialNeeds: string;
  }
}

interface FormContextType {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

// Create the context with default values
const FormContext = createContext<FormContextType | undefined>(undefined);

// Custom hook to use the context
export const useFormData = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormProvider");
  }
  return context;
};

// Provider component
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
    Kindergarten: {
      Name: "",
      Adress: "",
      Key: "",
      Picture: "",
      SpecialNeeds: ""
    }
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
