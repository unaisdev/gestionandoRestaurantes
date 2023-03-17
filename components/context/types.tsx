export interface ReservaInputsValue {
  nombre: string;
  telefono: string;
  personas: number;
  dia: string;
  hora: string;
  email: string;
  mas_info?: string;
}

export interface ReservaInputsErrorValue {
  nombre?: string;
  telefono?: string;
  personas?: string;
  dia?: string;
  hora?: string;
  email?: string;
  mas_info?: string;

}