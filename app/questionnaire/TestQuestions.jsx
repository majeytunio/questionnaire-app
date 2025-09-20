// const translations = {
//     English: {
//       welcome: "Welcome to the comprehensive assessment. Let's start with the first section: ",
//       nextSection: "Thank you for completing that section. Now let's move to: ",
//       completion: "Thank you for completing the entire assessment! Your responses have been recorded. Have a great day!",
//       section: "Section",
//       of: "of",
//       question: "Question",
//       thinking: "Thinking...",
//       placeholder: "Type your response...",
//       completedPlaceholder: "Assessment completed. Thank you!",
//       title: "Comprehensive Assessment",
//       sendButton: "Send",
//       questionnaire: [
//         {
//           title: "Aging Perspectives & Planning Ahead",
//           questions: [
//             "How comfortable are you asking for help with daily tasks if needed?",
//             "How do you feel about making changes to your daily life if aging or health made it necessary?",
//             "If you began to struggle with something important—like managing money, getting around, or cooking—how likely are you to tell someone?",
//             "How willing are you to assign someone to manage tasks if you could no longer do them?",
//             "In the event of an unexpected situation (e.g., health emergency, sudden need for help), how well have you prepared in terms of what to do and who to contact?",
//             "How do you feel about future care options?"
//           ]
//         },
//         {
//           title: "Physical Health, Pain & Nutrition",
//           questions: [
//             "How would you describe your appetite and ability to eat meals regularly?",
//             "Do you have chronic pain or health conditions that limit your daily activities?",
//             "How often do you feel fatigued or physically unable to do what you'd like?",
//             "Are you able to maintain a balanced diet without help?",
//             "How often do you engage in physical activity?"
//           ]
//         }
//       ]
//     }
//   };


//   export default translations;
















const translations = {
  English: {
    title: "AI Chat Assessment",
    welcome: "Welcome to the AI Assessment! Let's get started. First, we'll cover ",
    nextSection: "Great, moving on to the next section: ",
    completion: "Thank you for completing the assessment. I'm now generating your final report.",
    placeholder: "Type your response...",
    completedPlaceholder: "Assessment complete. Generating report...",
    thinking: "Generating response...",
    section: "Section",
    of: "of",
    question: "Question",
    downloadPDF: "Download PDF Report",
    generatingReport: "Generating your report, please wait...",
    downloadReport: "Download Report",
    questionnaire: [
      {
        title: "Personal Information",
        questions: [
          "What is your name?",
          "What is your profession?",
        ],
      },
      {
        title: "Interests and Hobbies",
        questions: [
          "What are your main hobbies?",
        ],
      },
      {
        title: "Future Goals",
        questions: [
          "What is one major goal you want to achieve this year?",
        ],
      },
    ],
  },
  Italian: {
    title: "Valutazione AI Chat",
    welcome: "Benvenuto nella valutazione AI! Iniziamo. Per prima cosa, tratteremo ",
    nextSection: "Ottimo, passiamo alla prossima sezione: ",
    completion: "Grazie per aver completato la valutazione. Sto generando il tuo rapporto finale.",
    placeholder: "Scrivi la tua risposta...",
    completedPlaceholder: "Valutazione completata. Generazione del rapporto...",
    thinking: "Generando la risposta...",
    section: "Sezione",
    of: "di",
    question: "Domanda",
    downloadPDF: "Scarica Rapporto PDF",
    questionnaire: [
      {
        title: "Informazioni Personali",
        questions: [
          "Qual è il tuo nome?",
          "Quanti anni hai?",
          "Che professione fai?",
        ],
      },
      {
        title: "Interessi e Hobby",
        questions: [
          "Quali sono i tuoi hobby principali?",
          "Cosa ti piace fare nel tuo tempo libero?",
          "C'è qualcosa di nuovo che vorresti provare?",
        ],
      },
      {
        title: "Obiettivi Futuri",
        questions: [
          "Qual è un obiettivo importante che vuoi raggiungere quest'anno?",
          "Come pensi di raggiungerlo?",
          "Da chi avrai bisogno di aiuto per raggiungere questo obiettivo?",
        ],
      },
    ],
  },
  German: {
    title: "KI-Chat-Bewertung",
    welcome: "Willkommen zur KI-Bewertung! Fangen wir an. Zuerst werden wir behandeln ",
    nextSection: "Großartig, wir gehen zum nächsten Abschnitt über: ",
    completion: "Vielen Dank für das Ausfüllen der Bewertung. Ich erstelle jetzt Ihren Abschlussbericht.",
    placeholder: "Geben Sie Ihre Antwort ein...",
    completedPlaceholder: "Bewertung abgeschlossen. Bericht wird generiert...",
    thinking: "Antwort wird generiert...",
    section: "Abschnitt",
    of: "von",
    question: "Frage",
    downloadPDF: "PDF-Bericht herunterladen",
    questionnaire: [
      {
        title: "Persönliche Informationen",
        questions: [
          "Wie ist Ihr Name?",
          "Wie alt sind Sie?",
          "Was ist Ihr Beruf?",
        ],
      },
      {
        title: "Interessen und Hobbys",
        questions: [
          "Was sind Ihre wichtigsten Hobbys?",
          "Was machen Sie gerne in Ihrer Freizeit?",
          "Gibt es etwas Neues, das Sie ausprobieren möchten?",
        ],
      },
      {
        title: "Zukünftige Ziele",
        questions: [
          "Was ist ein großes Ziel, das Sie dieses Jahr erreichen möchten?",
          "Wie planen Sie, es zu erreichen?",
          "Von wem benötigen Sie Hilfe, um dieses Ziel zu erreichen?",
        ],
      },
    ],
  },
  Spanish: {
    title: "Evaluación del Chat con IA",
    welcome: "¡Bienvenido a la evaluación de IA! Empecemos. Primero, cubriremos ",
    nextSection: "Genial, pasamos a la siguiente sección: ",
    completion: "Gracias por completar la evaluación. Ahora estoy generando tu informe final.",
    placeholder: "Escribe tu respuesta...",
    completedPlaceholder: "Evaluación completa. Generando informe...",
    thinking: "Generando respuesta...",
    section: "Sección",
    of: "de",
    question: "Pregunta",
    downloadPDF: "Descargar Informe PDF",
    questionnaire: [
      {
        title: "Información Personal",
        questions: [
          "¿Cuál es tu nombre?",
          "¿Cuántos años tienes?",
          "¿Cuál es tu profesión?",
        ],
      },
      {
        title: "Intereses y Hobbies",
        questions: [
          "¿Cuáles son tus principales pasatiempos?",
          "¿Qué te gusta hacer en tu tiempo libre?",
          "¿Hay algo nuevo que te gustaría probar?",
        ],
      },
      {
        title: "Objetivos Futuros",
        questions: [
          "¿Cuál es un objetivo importante que quieres lograr este año?",
          "¿Cómo planeas lograrlo?",
          "¿De quién necesitarás ayuda para lograr este objetivo?",
        ],
      },
    ],
  },
  French: {
    title: "Évaluation du Chat IA",
    welcome: "Bienvenue à l'évaluation IA ! Commençons. Tout d'abord, nous allons aborder ",
    nextSection: "Super, passons à la section suivante : ",
    completion: "Merci d'avoir complété l'évaluation. Je génère maintenant votre rapport final.",
    placeholder: "Écris ta réponse...",
    completedPlaceholder: "Évaluation terminée. Génération du rapport...",
    thinking: "Génération de la réponse...",
    section: "Section",
    of: "de",
    question: "Question",
    downloadPDF: "Télécharger le Rapport PDF",
    questionnaire: [
      {
        title: "Informations Personnelles",
        questions: [
          "Quel est votre nom ?",
          "Quel âge avez-vous ?",
          "Quelle est votre profession ?",
        ],
      },
      {
        title: "Intérêts et Loisirs",
        questions: [
          "Quels sont vos principaux loisirs ?",
          "Qu'aimez-vous faire pendant votre temps libre ?",
          "Y a-t-il quelque chose de nouveau que vous aimeriez essayer ?",
        ],
      },
      {
        title: "Objectifs Futurs",
        questions: [
          "Quel est un objectif majeur que vous souhaitez atteindre cette année ?",
          "Comment comptez-vous l'atteindre ?",
          "De qui aurez-vous besoin d'aide pour atteindre cet objectif ?",
        ],
      },
    ],
  },
  Catalan: {
    title: "Avaluació de Xat amb IA",
    welcome: "Benvingut a l'avaluació d'IA! Comencem. Primer, cobrirem ",
    nextSection: "Genial, passem a la següent secció: ",
    completion: "Gràcies per completar l'avaluació. Ara estic generant el teu informe final.",
    placeholder: "Escriu la teva resposta...",
    completedPlaceholder: "Avaluació completada. Generant informe...",
    thinking: "Generant resposta...",
    section: "Secció",
    of: "de",
    question: "Pregunta",
    downloadPDF: "Descarregar Informe PDF",
    questionnaire: [
      {
        title: "Informació Personal",
        questions: [
          "Com et dius?",
          "Quants anys tens?",
          "Quina és la teva professió?",
        ],
      },
      {
        title: "Interessos i Hobbys",
        questions: [
          "Quins són els teus passatemps principals?",
          "Què t'agrada fer en el teu temps lliure?",
          "Hi ha alguna cosa nova que t'agradaria provar?",
        ],
      },
      {
        title: "Objectius Futurs",
        questions: [
          "Quin és un objectiu important que vols aconseguir enguany?",
          "Com penses aconseguir-ho?",
          "De qui necessitaràs ajuda per aconseguir aquest objectiu?",
        ],
      },
    ],
  },
};

export default translations;