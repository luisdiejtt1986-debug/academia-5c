export const moduleData = {
  id: 1,
  title: "La C de Carácter",
  subtitle: "¿El cliente QUIERE pagar?",
  description: "La primera y más importante C del análisis de crédito",
  estimatedTime: "10 min",
  
  screens: [
    {
      type: "intro",
      title: "LA C DE CARÁCTER",
      subtitle: "¿El cliente quiere pagar?",
      description: "La primera y más importante C del crédito.",
      animatedText: [
        "Un cliente puede tener dinero…",
        "Puede tener negocio…",
        "Puede tener garantías…",
        "Pero si NO tiene voluntad de pago…",
        "⚠️ el crédito está en riesgo."
      ],
      characterMessage: "Hoy aprenderás cómo identificar si un cliente realmente quiere pagar sus obligaciones.",
      buttonText: "COMENZAR MISIÓN"
    },
    
    {
      type: "video",
      title: "La C de Carácter",
      duration: "2:00",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Reemplazar con tu video real
      learningPoints: [
        "Qué es el carácter",
        "Cómo analizarlo",
        "Qué herramientas usamos",
        "Señales de riesgo y de confianza"
      ],
      script: {
        scenes: [
          {
            title: "Intro",
            narration: [
              "Imagina que dos personas solicitan un crédito.",
              "Ambas tienen ingresos similares.",
              "Ambas tienen negocio.",
              "Pero solo una pagará puntualmente."
            ]
          },
          {
            title: "Caso Práctico",
            clients: [
              {
                name: "MARÍA",
                points: [
                  "Tiene tienda hace 5 años",
                  "Paga puntual a proveedores",
                  "Buenas referencias",
                  "Nunca evita llamadas",
                  "Cuando tuvo problemas… buscó acuerdos de pago"
                ],
                result: "✅ Alta voluntad de pago",
                type: "positive"
              },
              {
                name: "CARLOS",
                points: [
                  "Tiene ingresos similares",
                  "Pero cambia constantemente de dirección",
                  "Tiene reclamos frecuentes",
                  "Presenta atrasos repetitivos",
                  "Evita responder llamadas"
                ],
                result: "⚠️ Baja voluntad de pago",
                type: "warning"
              }
            ]
          },
          {
            title: "Explicación",
            narration: [
              "Eso es el CARÁCTER.",
              "La voluntad de cumplir.",
              "La honestidad.",
              "La responsabilidad financiera."
            ]
          },
          {
            title: "¿Cómo se analiza?",
            tools: [
              { icon: "🟦", name: "Referencias" },
              { icon: "🟦", name: "Buró de crédito" },
              { icon: "🟦", name: "Historial de pagos" },
              { icon: "🟦", name: "EVA SMART" },
              { icon: "🟦", name: "Comportamiento del cliente" }
            ],
            keyQuestion: "¿EL CLIENTE QUIERE PAGAR?"
          },
          {
            title: "Cierre",
            narration: [
              "Recuerda…",
              "Las personas suelen repetir sus comportamientos financieros.",
              "Por eso el carácter es la base del análisis crediticio."
            ]
          }
        ]
      }
    },
    
    {
      type: "explanation",
      title: "¿Qué es el carácter?",
      definition: "El carácter es la voluntad de pago del cliente.",
      description: "Es su compromiso, honestidad y responsabilidad para cumplir sus obligaciones financieras.",
      keyQuestion: "¿EL CLIENTE QUIERE PAGAR?",
      characteristics: [
        "honestidad",
        "responsabilidad",
        "voluntad de pago",
        "comportamiento financiero"
      ],
      tools: [
        {
          icon: "🟢",
          name: "EVA SMART",
          description: "Modelo estadístico que estima la probabilidad de pago."
        },
        {
          icon: "🔵",
          name: "Buró de Crédito",
          description: "Revisa el historial crediticio de los últimos años."
        },
        {
          icon: "🟢",
          name: "Referencias",
          description: "Opinión de terceros sobre el comportamiento del cliente."
        },
        {
          icon: "🔵",
          name: "Historial Interno",
          description: "Comportamiento de pago en nuestra institución."
        },
        {
          icon: "🟢",
          name: "Comportamiento",
          description: "Actitud, transparencia y responsabilidad."
        }
      ]
    },
    
    {
      type: "quiz",
      questions: [
        {
          id: 1,
          question: "¿Qué evalúa principalmente la C de Carácter?",
          options: [
            { id: "A", text: "El patrimonio del cliente" },
            { id: "B", text: "La voluntad de pago" },
            { id: "C", text: "Las ventas del negocio" },
            { id: "D", text: "Las garantías hipotecarias" }
          ],
          correct: "B",
          feedback: {
            correct: "¡Correcto! El carácter busca determinar si el cliente tiene intención y compromiso de cumplir sus obligaciones financieras.",
            incorrect: "Recuerda: El carácter se enfoca en la voluntad y compromiso de pago, no en los activos o garantías."
          }
        },
        {
          id: 2,
          question: "¿Qué comportamiento representa MAYOR riesgo?",
          options: [
            { id: "A", text: "Atrasos ocasionales y comunicación constante" },
            { id: "B", text: "Historial estable" },
            { id: "C", text: "Múltiples consultas recientes y evasión de llamadas" },
            { id: "D", text: "Referencias positivas" }
          ],
          correct: "C",
          feedback: {
            correct: "¡Exacto! Muchas consultas recientes pueden indicar sobreendeudamiento o búsqueda desesperada de crédito.",
            incorrect: "Piensa: ¿Qué comportamiento sugiere que el cliente está evitando sus responsabilidades?"
          }
        }
      ]
    },
    
    {
      type: "storytelling",
      title: "Caso práctico",
      subtitle: "Conoce a Ana y Carlos",
      cases: [
        {
          name: "Ana",
          avatar: "👩",
          age: 20,
          business: "Restaurante pequeño",
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
      feedback: "Así es, alto riesgo. Muchas consultas recientes pueden indicar sobreendeudamiento o búsqueda desesperada de crédito."
    },
    
    {
      type: "summary",
      title: "Resumen del módulo",
      points: [
        { icon: "🎯", text: "El carácter es la voluntad de pago." },
        { icon: "🛠️", text: "Se analiza con herramientas confiables." },
        { icon: "📊", text: "Las personas tienden a repetir sus comportamientos financieros." },
        { icon: "💡", text: "Detectar señales a tiempo reduce el riesgo." }
      ],
      keyQuestion: "¿EL CLIENTE QUIERE PAGAR?",
      warningSignals: [
        "Muchas consultas recientes",
        "Historial de mora elevado",
        "Referencias negativas",
        "Información inconsistente",
        "Problemas judiciales frecuentes"
      ],
      positiveSignals: [
        "Historial estable",
        "Buenas referencias",
        "Transparencia",
        "Responsabilidad",
        "Cumplimiento histórico"
      ]
    },
    
    {
      type: "completion",
      title: "¡Módulo completado!",
      badge: {
        name: "Detector de Carácter",
        icon: "🏅",
        description: "Has desbloqueado una nueva insignia"
      },
      finalMessage: "El cliente con buena voluntad de pago buscará la manera de cumplir incluso en momentos difíciles.",
      stats: {
        lessons: 6,
        questions: 5,
        score: 95
      }
    }
  ]
};

export default moduleData;