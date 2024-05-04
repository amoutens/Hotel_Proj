import { useState } from "react";
import { Client } from "../App";

export const useClientState = () => {
  const [selectedClient, setSelectedClient] = useState<Client>({
    _id: '',
    name: '',
    phone: '',
    passport: ''
  });

  return { selectedClient, setSelectedClient };
};
