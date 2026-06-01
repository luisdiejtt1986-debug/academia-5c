export const courseData = [
  {
    id: 1,
    title: "Carácter",
    subtitle: "¿El cliente QUIERE pagar?",
    icon: "👤",
    locked: false,
    progress: 0,
    screens: [
      {
        type: "intro",
        title: "LA C DE CARÁCTER",
        subtitle: "¿El cliente quiere pagar?",
        text: "La primera y más importante C del crédito.",
        video: "https://youtu.be/jXxfxcrqxGE", 
        animated: [
          "Un cliente puede tener dinero…",
          "Puede tener negocio…",
          "Puede tener garantías…",
          "Pero si NO tiene voluntad de pago…",
          "⚠️ el crédito está en riesgo."
        ],
        button: "COMENZAR MISIÓN"
      },
      {
        type: "video",
        title: "La Voluntad de Pago",
        url: "https://youtu.be/wJ2PdKMm5qw",
        points: ["Qué es el carácter", "Herramientas de análisis", "Señales de riesgo"]
      },
      {
        type: "explanation",
        title: "Herramientas",
        definition: "El carácter es la voluntad de pago del cliente.",
        tools: [
          { name: "EVA SMART", icon: "🟢", desc: "Modelo estadístico que estima la probabilidad de pago." },
          { name: "Buró de Crédito", icon: "🔵", desc: "Revisa el historial crediticio de los últimos años." },
          { name: "Referencias", icon: "🟢", desc: "Opinión de terceros sobre el comportamiento del cliente." },
          { name: "Historial Interno", icon: "🔵", desc: "Comportamiento de pago en nuestra institución." }
        ]
      },
      {
        type: "quiz",
        questions: [
          {
            q: "¿Qué evalúa principalmente la C de Carácter?",
            options: ["El patrimonio del cliente", "La voluntad de pago", "Las ventas del negocio", "Las garantías hipotecarias"],
            correct: 1,
            feedback: "¡Correcto! El carácter busca determinar si el cliente tiene intención y compromiso de cumplir sus obligaciones financieras."
          },
          {
            q: "¿Qué comportamiento representa MAYOR riesgo?",
            options: ["Atrasos ocasionales y comunicación constante", "Historial estable", "Múltiples consultas recientes y evasión de llamadas", "Referencias positivas"],
            correct: 2,
            feedback: "¡Exacto! Muchas consultas recientes pueden indicar sobreendeudamiento o búsqueda desesperada de crédito."
          }
        ]
      },
// ... en el módulo de Carácter (id: 4), después del quiz y antes del summary:

{
  type: "storytelling",
  title: "Caso práctico",
  subtitle: "Conoce a Ana y Carlos",
  cases: [
    {
      name: "Ana",
      avatar: "👩",
      points: [
        { text: "Tiene tienda hace 5 años", type: "positive" },
        { text: "Paga puntual a proveedores", type: "positive" },
        { text: "Buenas referencias", type: "positive" },
        { text: "Comunica cuando tiene problemas", type: "positive" }
      ],
      tag: "ALTA VOLUNTAD DE PAGO",
      tagType: "success"
    },
    {
      name: "Carlos",
      avatar: "👨",
      points: [
        { text: "Cambia de dirección seguido", type: "warning" },
        { text: "Atrasos repetitivos", type: "warning" },
        { text: "Evita llamadas", type: "warning" },
        { text: "Reclamos frecuentes", type: "warning" }
      ],
      tag: "BAJA VOLUNTAD DE PAGO",
      tagType: "danger"
    }
  ],
  question: "¿Quién representa menor riesgo para otorgar un crédito?",
  options: [
    { id: "A", text: "Ana" },
    { id: "B", text: "Carlos" }
  ],
  correct: "A",
  feedback: "Así es. Ana muestra comportamientos de responsabilidad y transparencia que indican buena voluntad de pago."
},
      {
        type: "summary",
        title: "Resumen del módulo",
        points: [
          { icon: "🎯", text: "El carácter es la voluntad de pago." },
          { icon: "🛠️", text: "Se analiza con herramientas confiables." },
          { icon: "📊", text: "Las personas tienden a repetir sus comportamientos financieros." }
        ]
      },
      {
        type: "completion",
        badge: "Detector de Carácter",
        score: 95
      }
    ]
  },
  
  {
    id: 2,
    title: "Capacidad",
    subtitle: "¿El cliente PUEDE pagar?",
    icon: "📊",
    locked: false,
    progress: 0,
    screens: [
      {
        type: "intro",
        title: "LA C DE CAPACIDAD",
        subtitle: "¿El cliente PUEDE pagar?",
        text: "Analiza los ingresos, gastos y deudas para conocer la verdadera capacidad de pago.",
        video: "https://youtu.be/uKKCFrTiEOE",
        animated: [
          "Tener ventas NO siempre significa tener capacidad de pago.",
          "Muchos negocios venden bastante…",
          "pero también gastan demasiado.",
          "⚠️ El verdadero análisis está en el flujo disponible."
        ],
        button: "INICIAR ANÁLISIS"
      },
      {
        type: "video",
        title: "Flujo de Caja",
        url: "https://youtu.be/eqflLyaXtO0",
        points: ["Dinero disponible real", "Gastos vs Deudas", "Simulador de crédito"]
      },
      {
        type: "explanation",
        title: "Fórmula Clave",
        definition: "Capacidad = Ingresos - (Gastos + Deudas)",
        tools: [
          { name: "Ingresos", icon: "💰", desc: "Ventas del negocio y otros ingresos." },
          { name: "Gastos del Negocio", icon: "💸", desc: "Arriendo, proveedores, servicios." },
          { name: "Gastos Familiares", icon: "🏠", desc: "Manutención, educación, alimentación." },
          { name: "Deudas Actuales", icon: "💳", desc: "Cuotas bancarias y créditos vigentes." }
        ]
      },
      {
        type: "simulator",
        title: "Simulador de Riesgo",
        initialData: { income: 2500, expenses: 1200, debts: 400 }
      },
      {
        type: "quiz",
        questions: [
          {
            q: "¿Qué representa la capacidad de pago?",
            options: ["El valor de las garantías", "El dinero disponible luego de cubrir gastos y deudas", "El tamaño del negocio", "Las referencias del cliente"],
            correct: 1,
            feedback: "¡Correcto! La capacidad analiza cuánto dinero realmente queda disponible para la nueva cuota."
          },
          {
            q: "¿Cuál es el error MÁS peligroso al analizar la capacidad?",
            options: ["Revisar demasiados gastos", "Subestimar gastos familiares", "Verificar el buró de crédito", "Revisar el flujo de caja"],
            correct: 1,
            feedback: "¡Exacto! Muchos análisis fallan porque los gastos reales del cliente son mayores a los declarados."
          }
        ]
      },
      {
        type: "summary",
        title: "Resumen del módulo",
        points: [
          { icon: "📊", text: "La capacidad es el dinero disponible después de cubrir gastos y deudas." },
          { icon: "🔍", text: "Analiza ingresos, gastos, deudas y flujo disponible." },
          { icon: "⚠️", text: "Revisa el buró para detectar sobreendeudamiento." }
        ]
      },
      {
        type: "completion",
        badge: "Analista de Capacidad",
        score: 92
      }
    ]
  },

{
  id: 3,
  title: "Capital",
  subtitle: "¿Qué tan sólida es la situación financiera?",
  icon: "💰",
  locked: false,
  progress: 0,
  screens: [
    {
      type: "intro",
      title: "LA C DE CAPITAL",
      subtitle: "¿Qué tan fuerte financieramente es el cliente?",
      text: "Un cliente puede tener ingresos… Pero si no posee respaldo financiero… cualquier problema puede poner en riesgo el crédito.",
      video: "https://youtu.be/n-xG_UXCVHE",
      animated: [
        "El capital muestra el respaldo económico.",
        "Representa el patrimonio del cliente.",
        "Es la base de su solidez.",
        "️ Sin capital, el cliente es vulnerable."
      ],
      button: "COMENZAR ANÁLISIS"
    },
    {
      type: "video",
      title: "Capital Sólido",
      url: "https://youtu.be/0a5LWfK3ujY",
      points: ["Qué es el patrimonio", "Activos vs Pasivos", "Importancia del respaldo"]
    },
    {
      type: "explanation",
      title: "Fórmula Clave",
      definition: "Capital = Activos - Pasivos",
      tools: [
        { name: "Activos", icon: "", desc: "Lo que el cliente posee (Casa, Auto, Ahorros)." },
        { name: "Pasivos", icon: "", desc: "Lo que el cliente debe (Tarjetas, Préstamos)." },
        { name: "Patrimonio", icon: "💵", desc: "Lo que realmente le pertenece al cliente." }
      ]
    },
    {
      type: "capitalSimulator", // Usaremos un componente especial para este
      title: "Simulador de Patrimonio",
      initialData: { assets: 70000, liabilities: 22000, savings: 8000 }
    },
    {
      type: "storytelling",
      title: "Caso práctico",
      subtitle: "La ferretería de Miguel",
      cases: [
        {
          name: "Miguel",
          avatar: "👨‍🔧",
          points: [
            { text: "Negocio propio", type: "positive" },
            { text: "Casa propia", type: "positive" },
            { text: "Ahorros moderados", type: "positive" },
            { text: "Deuda baja", type: "positive" }
          ],
          tag: "CAPITAL SÓLIDO",
          tagType: "success"
        }
      ],
      question: "¿Cómo es su capital?",
      options: [{ id: "A", text: "Débil" }, { id: "B", text: "Moderado" }, { id: "C", text: "Sólido" }],
      correct: "C",
      feedback: "Correcto. Miguel posee patrimonio propio y baja dependencia de deuda externa."
    },
    {
      type: "quiz",
      questions: [
        {
          q: "¿Qué representa mejor el capital?",
          options: ["Las referencias personales", "El patrimonio y respaldo financiero", "El historial de llamadas", "La voluntad de pago"],
          correct: 1,
          feedback: "¡Correcto! El capital mide la solidez financiera y los bienes reales del cliente."
        }
      ]
    },
    {
      type: "summary",
      title: "Resumen",
      points: [
        { icon: "🏦", text: "El capital es el respaldo financiero del cliente." },
        { icon: "📊", text: "Se calcula como activos menos pasivos." },
        { icon: "⚠️", text: "Detecta señales de debilidad para tomar mejores decisiones." }
      ]
    },
    {
      type: "completion",
      badge: "Analista de Capital",
      score: 94
    }
  ]
},
  
{
  id: 4,
  title: "Colateral",
  subtitle: "¿Qué respaldo tiene el crédito?",
  icon: "🛡️",
  locked: false,
  progress: 0,
  screens: [
    {
      type: "intro",
      title: "LA C DE COLATERAL",
      subtitle: "¿Qué respaldo tiene el crédito?",
      text: "Cuando un cliente no paga… la institución necesita un respaldo. Ahí aparece el colateral.",
      video: "https://youtu.be/IkojjXaagdw",
      animated: [
        "Las garantías ayudan a reducir el riesgo.",
        "Pero NO reemplazan un buen análisis.",
        "El cliente puede tener casa y auto...",
        "️ pero si no paga, es un problema."
      ],
      button: "INICIAR ANÁLISIS"
    },
    {
      type: "video",
      title: "Garantías y Riesgo",
      url: "https://youtu.be/Khy9vXliPEo",
      points: ["Qué es el colateral", "Tipos de garantía", "Errores comunes"]
    },
    {
      type: "explanation",
      title: "Tipos de Garantía",
      definition: "El colateral es el respaldo que ayuda a cubrir el riesgo del crédito.",
      tools: [
        { name: "Garantía Real 🏠", icon: "", desc: "Bienes tangibles: Casa, Vehículo, Terrenos, Depósitos." },
        { name: "Garantía Personal ", icon: "", desc: "Compromiso: Garante, Codeudor, Grupo Solidario." }
      ]
    },
    {
      type: "storytelling",
      title: "Caso práctico",
      subtitle: "El Taxista",
      cases: [
        {
          name: "Taxista",
          avatar: "🚖",
          points: [
            { text: "Solicita crédito vehicular de $12,000", type: "neutral" },
            { text: "Vehículo propio (Nuevo)", type: "positive" },
            { text: "Ingresos variables", type: "warning" },
            { text: "Historial regular", type: "positive" }
          ],
          tag: "¿QUÉ TIPO DE GARANTÍA EXISTE?",
          tagType: "neutral"
        }
      ],
      question: "¿Qué tipo de colateral existe en esta operación?",
      options: [
        { id: "A", text: "Garantía personal (Codeudor)" },
        { id: "B", text: "Garantía real (El vehículo)" },
        { id: "C", text: "Sin garantía" }
      ],
      correct: "B",
      feedback: "¡Correcto! El vehículo funciona como respaldo directo de la operación. Es una garantía real."
    },
    {
      type: "summary", // Usamos summary para las alertas rápidas
      title: "Alertas Importantes",
      points: [
        { icon: "", text: "Aprobar SOLO por tener garantía es un error grave." },
        { icon: "📉", text: "No sobrevalores los bienes (siempre se deprecian)." },
        { icon: "🚫", text: "Nunca ignores la capacidad de pago por tener colateral." },
        { icon: "️", text: "Confía solo en garantías fáciles de ejecutar." }
      ]
    },
    {
      type: "collateralSimulator", // Nuevo componente específico
      title: "Simulador de Cobertura",
      initialData: { value: 25000, loan: 18000, depreciation: 15 }
    },
    {
      type: "quiz",
      questions: [
        {
          q: "¿Cuál es la mejor afirmación sobre el colateral?",
          options: ["El colateral elimina todo el riesgo", "La garantía reemplaza la capacidad de pago", "El colateral es un respaldo adicional", "Tener garantía asegura aprobación automática"],
          correct: 2,
          feedback: "¡Exacto! El colateral es un respaldo COMPLEMENTARIO. Nunca debe ser la única razón para aprobar."
        }
      ]
    },
    {
      type: "completion",
      badge: "Especialista en Garantías",
      score: 93
    }
  ]
},
  {
  id: 5,
  title: "Condiciones",
  subtitle: "¿Cómo afecta el entorno al crédito?",
  icon: "🌍",
  locked: false,
  progress: 0,
  screens: [
    {
      type: "intro",
      title: "LA C DE CONDICIONES",
      subtitle: "¿Cómo afecta el entorno al crédito?",
      text: "Un cliente puede querer pagar y poder pagar… pero el entorno también puede afectar el riesgo.",
      video: "https://youtu.be/-iqYLdE8geo",
      animated: [
        "Factores externos influyen en el riesgo.",
        "Economía, clima y mercado.",
        "No todos los riesgos dependen del cliente.",
        "️ Incluso un buen cliente puede caer si su entorno es hostil."
      ],
      button: "COMENZAR ANÁLISIS"
    },
    {
      type: "video",
      title: "Entorno Favorable vs Riesgoso",
      url: "https://youtu.be/hwDHdCqGYfs",
      points: ["Factores externos que influyen", "Señales de riesgo y oportunidades", "Por qué impactan en el crédito"]
    },
    {
      type: "explanation",
      title: "Entorno del Cliente",
      definition: "Las condiciones son factores externos que afectan positiva o negativamente la capacidad de pago.",
      tools: [
        { name: "Favorables 🟢", icon: "✅", desc: "Mercado estable, ventas constantes, buen acceso." },
        { name: "Riesgosas 🔴", icon: "⚠️", desc: "Crisis económica, alta inflación, desastres naturales." }
      ]
    },
    {
      type: "storytelling",
      title: "Caso práctico",
      subtitle: "La Camaronera",
      cases: [
        {
          name: "Productor Camaronero",
          avatar: "🦐",
          points: [
            { text: "Buenas ventas históricas", type: "positive" },
            { text: "Buen historial crediticio", type: "positive" },
            { text: "Restricciones de exportación", type: "warning" },
            { text: "Problemas climáticos (El Niño)", type: "warning" }
          ],
          tag: "¿QUÉ 'C' ESTÁ AFECTADA?",
          tagType: "neutral"
        }
      ],
      question: "¿Qué C se está viendo afectada principalmente en este caso?",
      options: [
        { id: "A", text: "Capital" },
        { id: "B", text: "Colateral" },
        { id: "C", text: "Condiciones" },
        { id: "D", text: "Carácter" }
      ],
      correct: "C",
      feedback: "¡Exacto! Aunque el cliente tiene capital y carácter, las condiciones externas (clima y exportación) amenazan su capacidad de pago."
    },
    {
      type: "summary",
      title: "Alertas Importantes",
      points: [
        { icon: "📉", text: "Caída del mercado o demanda." },
        { icon: "🏚️", text: "Crisis económica del país." },
        { icon: "️", text: "Problemas climáticos o desastres." },
        { icon: "💸", text: "Incremento fuerte de costos." }
      ]
    },
    {
      type: "conditionsSimulator", // Componente especial para este módulo
      title: "Simulador de Riesgo Externo",
      initialData: { inflation: 70, salesDrop: 60, climate: 30, logistics: 50 }
    },
    {
      type: "quiz",
      questions: [
        {
          q: "¿Qué analiza la C de Condiciones?",
          options: ["Las garantías del cliente", "Los factores externos y el entorno económico", "Las referencias personales", "El patrimonio del cliente"],
          correct: 1,
          feedback: "¡Correcto! Las condiciones evalúan el mundo que rodea al cliente y cómo esto puede afectar su negocio."
        }
      ]
    },
    {
      type: "completion",
      badge: "Analista de Entorno",
      score: 91
    }
  ]
}
];