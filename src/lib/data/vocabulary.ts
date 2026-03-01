export interface VocabularyTerm {
  term: string;
  definition: string;
  module: number;
  category: string;
}

export const vocabulary: VocabularyTerm[] = [
  // Modulo 1 — Tu atencion dura 47 segundos
  { term: 'Span Atencional', definition: 'Duracion promedio que una persona mantiene su atencion en una tarea antes de cambiar. Segun Gloria Mark, el promedio en pantalla es de 47 segundos.', module: 1, category: 'Neurociencia' },
  { term: 'Residuo Atencional', definition: 'Persistencia de actividad cognitiva sobre la Tarea A incluso despues de cambiar a la Tarea B. Acunado por Sophie Leroy (2009). Causa degradacion medible del rendimiento.', module: 1, category: 'Neurociencia' },
  { term: 'Auto-interrupcion', definition: 'Cuando te interrumpis a vos mismo sin estimulo externo. La investigacion de Gloria Mark muestra que nos auto-interrumpimos MAS de lo que somos interrumpidos por otros.', module: 1, category: 'Neurociencia' },
  { term: 'Cambio de Contexto', definition: 'El acto de saltar de una tarea a otra. Cada cambio genera residuo atencional y cuesta un promedio de 23 minutos y 15 segundos para recuperar el foco completo.', module: 1, category: 'Productividad' },

  // Modulo 2 — No estas roto, sos creativo
  { term: 'Atencion Permeable', definition: 'Caracteristica cognitiva de mentes creativas donde el span atencional es mas amplio, permitiendo captar estimulos perifericos. Investigado por Zabelina (Northwestern).', module: 2, category: 'Creatividad' },
  { term: 'Multipotencialita', definition: 'Persona con multiples intereses y busquedas creativas que no quiere comprometerse con un solo camino. Termino de Emilie Wapnick (2015).', module: 2, category: 'Identidad' },
  { term: 'Modelo Group Hug', definition: 'Uno de los 4 modelos de Wapnick: un solo trabajo o negocio que integra multiples habilidades e intereses. Ideal para quienes quieren todo en un solo lugar.', module: 2, category: 'Multipotencialidad' },
  { term: 'Modelo Phoenix', definition: 'Uno de los 4 modelos de Wapnick: inmersion total secuencial — te sumerges profundamente en algo, y cuando lo dominas, lo dejas y empezas algo nuevo.', module: 2, category: 'Multipotencialidad' },
  { term: 'Scanner', definition: 'Termino de Barbara Sher para personas "geneticamente cableadas para interesarse en muchas cosas." Sinonimo de multipotencialita.', module: 2, category: 'Identidad' }
];
