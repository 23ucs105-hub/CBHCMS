export type Language = 'en' | 'hi' | 'ta';

export const translations = {
    en: {
        // General
        appName: "CBHCMS",
        welcome: "How can we help?",
        voicePrompt: "Tap the microphone and say \"Emergency\" or \"Help\" for immediate assistance.",
        listening: "Listening...",
        processing: "Processing...",
        idle: "Idle",
        alertSent: "Alert Sent!",
        error: "Error",
        adminLogin: "Admin Login",
        workerApp: "Worker App",

        // Admin
        adminPortal: "Admin Portal",
        dashboard: "Dashboard",
        healthWorkers: "Health Workers",
        alertsLogs: "Alerts & Logs",
        simulationView: "Simulation View",
        logout: "Logout",
        systemOnline: "System Online",

        // Worker
        responderApp: "Responder App",
        online: "Online",
        iAmA: "I am a...",
        incomingAlerts: "Incoming Alerts",
        noAlerts: "No active alerts for your category.",
        acknowledge: "Acknowledge",
        priority: "Priority",

        // Admin Dashboard
        totalHealthWorkers: "Total Health Workers",
        activeAlerts24h: "Active Alerts (24h)",
        categories: "Categories",
        systemStatus: "System Status",
        cloudFunctions: "Cloud Functions",
        database: "Database (SQLite/Prisma)",
        voiceGateway: "Voice Gateway",
        operational: "Operational",
        connected: "Connected",
        statusListening: "Listening",

        // Simulation
        cloudSimulationGateway: "CLOUD_SIMULATION_GATEWAY_v1.0",
        region: "REGION",
        cpu: "CPU",
        eventLogStream: "Event Log Stream",
        serviceHealthAPI: "Service Health API",
        smsGateway: "SMS Gateway",
        voiceAPI: "Voice API",
        emailSMTP: "Email SMTP",
        alertEngine: "Alert Engine",
    },
    hi: {
        // General
        appName: "CBHCMS",
        welcome: "हम आपकी कैसे मदद कर सकते हैं?",
        voicePrompt: "माइक पर टैप करें और तत्काल सहायता के लिए \"आपातकाल\" या \"मदद\" कहें।",
        listening: "सुन रहा हूँ...",
        processing: "प्रक्रिया चल रही है...",
        idle: "निष्क्रिय",
        alertSent: "चेतावनी भेजी गई!",
        error: "त्रुटि",
        adminLogin: "व्यवस्थापक लॉगिन",
        workerApp: "कार्यकर्ता ऐप",

        // Admin
        adminPortal: "व्यवस्थापक पोर्टल",
        dashboard: "डैशबोर्ड",
        healthWorkers: "स्वास्थ्य कार्यकर्ता",
        alertsLogs: "चेतावनी और लॉग",
        simulationView: "सिमुलेशन दृश्य",
        logout: "लॉग आउट",
        systemOnline: "सिस्टम ऑनलाइन",

        // Worker
        responderApp: "रिस्पॉन्डर ऐप",
        online: "ऑनलाइन",
        iAmA: "मैं एक हूँ...",
        incomingAlerts: "आने वाली चेतावनियाँ",
        noAlerts: "आपकी श्रेणी के लिए कोई सक्रिय चेतावनी नहीं है।",
        acknowledge: "स्वीकार करें",
        priority: "प्राथमिकता",

        // Admin Dashboard
        totalHealthWorkers: "कुल स्वास्थ्य कार्यकर्ता",
        activeAlerts24h: "सक्रिय चेतावनियाँ (24 घंटे)",
        categories: "श्रेणियाँ",
        systemStatus: "सिस्टम स्थिति",
        cloudFunctions: "क्लाउड फ़ंक्शंस",
        database: "डेटाबेस (SQLite/Prisma)",
        voiceGateway: "वॉयस गेटवे",
        operational: "संचालित",
        connected: "जुड़ा हुआ",
        statusListening: "सुन रहा है",

        // Simulation
        cloudSimulationGateway: "क्लाउड सिमुलेशन गेटवे v1.0",
        region: "क्षेत्र",
        cpu: "सीपीयू",
        eventLogStream: "इवेंट लॉग स्ट्रीम",
        serviceHealthAPI: "सेवा स्वास्थ्य एपीआई",
        smsGateway: "एसएमएस गेटवे",
        voiceAPI: "वॉयस एपीआई",
        emailSMTP: "ईमेल एसएमटीपी",
        alertEngine: "चेतावनी इंजन",
    },
    ta: {
        // General
        appName: "CBHCMS",
        welcome: "நாங்கள் உங்களுக்கு எப்படி உதவ முடியும்?",
        voicePrompt: "மைக்ரோஃபோனைத் தட்டி, உடனடி உதவிக்கு \"அவசரம்\" அல்லது \"உதவி\" என்று சொல்லுங்கள்.",
        listening: "கேட்கிறது...",
        processing: "செயலாக்குகிறது...",
        idle: "செயலற்றது",
        alertSent: "எச்சரிக்கை அனுப்பப்பட்டது!",
        error: "பிழை",
        adminLogin: "நிர்வாகி உள்நுழைவு",
        workerApp: "பணியாளர் செயலி",

        // Admin
        adminPortal: "நிர்வாகி தளம்",
        dashboard: "முகப்பு",
        healthWorkers: "சுகாதார பணியாளர்கள்",
        alertsLogs: "எச்சரிக்கைகள் & பதிவுகள்",
        simulationView: "உருவகப்படுத்துதல் காட்சி",
        logout: "வெளியேறு",
        systemOnline: "அமைப்பு ஆன்லைனில்",

        // Worker
        responderApp: "பதிலளிப்பவர் செயலி",
        online: "ஆன்லைன்",
        iAmA: "நான் ஒரு...",
        incomingAlerts: "உள்வரும் எச்சரிக்கைகள்",
        noAlerts: "உங்கள் வகைக்கு செயலில் உள்ள எச்சரிக்கைகள் இல்லை.",
        acknowledge: "ஏற்றுக்கொள்",
        priority: "முன்னுரிமை",

        // Admin Dashboard
        totalHealthWorkers: "மொத்த சுகாதார பணியாளர்கள்",
        activeAlerts24h: "செயலில் உள்ள எச்சரிக்கைகள் (24 மணிநேரம்)",
        categories: "வகைகள்",
        systemStatus: "அமைப்பு நிலை",
        cloudFunctions: "கிளவுட் செயல்பாடுகள்",
        database: "தரவுத்தளம் (SQLite/Prisma)",
        voiceGateway: "குரல் நுழைவாயில்",
        operational: "செயல்பாட்டில்",
        connected: "இணைக்கப்பட்டுள்ளது",
        statusListening: "கேட்கிறது",

        // Simulation
        cloudSimulationGateway: "கிளவுட் சிமுலேஷன் கேட்வே v1.0",
        region: "பகுதி",
        cpu: "CPU",
        eventLogStream: "நிகழ்வு பதிவு ஸ்ட்ரீம்",
        serviceHealthAPI: "சேவை சுகாதார API",
        smsGateway: "SMS நுழைவாயில்",
        voiceAPI: "குரல் API",
        emailSMTP: "மின்னஞ்சல் SMTP",
        alertEngine: "எச்சரிக்கை இயந்திரம்",
    }
};
