"use client";

import { useState } from "react";
import { MessageCircle, Copy, ExternalLink, Send, QrCode, Download, Code, Share2, Globe } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

const countryCodes = [
  { name: "Afghanistan", code: "93", flag: "🇦🇫" },
  { name: "Albania", code: "355", flag: "🇦🇱" },
  { name: "Algeria", code: "213", flag: "🇩🇿" },
  { name: "American Samoa", code: "1", flag: "🇦🇸" },
  { name: "Andorra", code: "376", flag: "🇦🇩" },
  { name: "Angola", code: "244", flag: "🇦🇴" },
  { name: "Anguilla", code: "1", flag: "🇦🇮" },
  { name: "Antigua and Barbuda", code: "1", flag: "🇦🇬" },
  { name: "Argentina", code: "54", flag: "🇦🇷" },
  { name: "Armenia", code: "374", flag: "🇦🇲" },
  { name: "Aruba", code: "297", flag: "🇦🇼" },
  { name: "Australia", code: "61", flag: "🇦🇺" },
  { name: "Austria", code: "43", flag: "🇦🇹" },
  { name: "Azerbaijan", code: "994", flag: "🇦🇿" },
  { name: "Bahamas", code: "1", flag: "🇧🇸" },
  { name: "Bahrain", code: "973", flag: "🇧🇭" },
  { name: "Bangladesh", code: "880", flag: "🇧🇩" },
  { name: "Barbados", code: "1", flag: "🇧🇧" },
  { name: "Belarus", code: "375", flag: "🇧🇾" },
  { name: "Belgium", code: "32", flag: "🇧🇪" },
  { name: "Belize", code: "501", flag: "🇧🇿" },
  { name: "Benin", code: "229", flag: "🇧🇯" },
  { name: "Bermuda", code: "1", flag: "🇧🇲" },
  { name: "Bhutan", code: "975", flag: "🇧🇹" },
  { name: "Bolivia", code: "591", flag: "🇧🇴" },
  { name: "Bosnia and Herzegovina", code: "387", flag: "🇧🇦" },
  { name: "Botswana", code: "267", flag: "🇧🇼" },
  { name: "Brazil", code: "55", flag: "🇧🇷" },
  { name: "British Virgin Islands", code: "1", flag: "🇻🇬" },
  { name: "Brunei", code: "673", flag: "🇧🇳" },
  { name: "Bulgaria", code: "359", flag: "🇧🇬" },
  { name: "Burkina Faso", code: "226", flag: "🇧🇫" },
  { name: "Burundi", code: "257", flag: "🇧🇮" },
  { name: "Cambodia", code: "855", flag: "🇰🇭" },
  { name: "Cameroon", code: "237", flag: "🇨🇲" },
  { name: "Canada", code: "1", flag: "🇨🇦" },
  { name: "Cape Verde", code: "238", flag: "🇨🇻" },
  { name: "Cayman Islands", code: "1", flag: "🇰🇾" },
  { name: "Central African Republic", code: "236", flag: "🇨🇫" },
  { name: "Chad", code: "235", flag: "🇹🇩" },
  { name: "Chile", code: "56", flag: "🇨🇱" },
  { name: "China", code: "86", flag: "🇨🇳" },
  { name: "Colombia", code: "57", flag: "🇨🇴" },
  { name: "Comoros", code: "269", flag: "🇰🇲" },
  { name: "Congo", code: "242", flag: "🇨🇬" },
  { name: "Cook Islands", code: "682", flag: "🇨🇰" },
  { name: "Costa Rica", code: "506", flag: "🇨🇷" },
  { name: "Croatia", code: "385", flag: "🇭🇷" },
  { name: "Cuba", code: "53", flag: "🇨🇺" },
  { name: "Cyprus", code: "357", flag: "🇨🇾" },
  { name: "Czech Republic", code: "420", flag: "🇨🇿" },
  { name: "Denmark", code: "45", flag: "🇩🇰" },
  { name: "Djibouti", code: "253", flag: "🇩🇯" },
  { name: "Dominica", code: "1", flag: "🇩🇲" },
  { name: "Dominican Republic", code: "1", flag: "🇩🇴" },
  { name: "Ecuador", code: "593", flag: "🇪🇨" },
  { name: "Egypt", code: "20", flag: "🇪🇬" },
  { name: "El Salvador", code: "503", flag: "🇸🇻" },
  { name: "Equatorial Guinea", code: "240", flag: "🇬🇶" },
  { name: "Eritrea", code: "291", flag: "🇪🇷" },
  { name: "Estonia", code: "372", flag: "🇪🇪" },
  { name: "Eswatini", code: "268", flag: "🇸🇿" },
  { name: "Ethiopia", code: "251", flag: "🇪🇹" },
  { name: "Falkland Islands", code: "500", flag: "🇫🇰" },
  { name: "Faroe Islands", code: "298", flag: "🇫🇴" },
  { name: "Fiji", code: "679", flag: "🇫🇯" },
  { name: "Finland", code: "358", flag: "🇫🇮" },
  { name: "France", code: "33", flag: "🇫🇷" },
  { name: "French Guiana", code: "594", flag: "🇬🇫" },
  { name: "French Polynesia", code: "689", flag: "🇵🇫" },
  { name: "Gabon", code: "241", flag: "🇬🇦" },
  { name: "Gambia", code: "220", flag: "🇬🇲" },
  { name: "Georgia", code: "995", flag: "🇬🇪" },
  { name: "Germany", code: "49", flag: "🇩🇪" },
  { name: "Ghana", code: "233", flag: "🇬🇭" },
  { name: "Gibraltar", code: "350", flag: "🇬🇮" },
  { name: "Greece", code: "30", flag: "🇬🇷" },
  { name: "Greenland", code: "299", flag: "🇬🇱" },
  { name: "Grenada", code: "1", flag: "🇬🇩" },
  { name: "Guadeloupe", code: "590", flag: "🇬🇵" },
  { name: "Guam", code: "1", flag: "🇬🇺" },
  { name: "Guatemala", code: "502", flag: "🇬🇹" },
  { name: "Guinea", code: "224", flag: "🇬🇳" },
  { name: "Guinea-Bissau", code: "245", flag: "🇬🇼" },
  { name: "Guyana", code: "592", flag: "🇬🇾" },
  { name: "Haiti", code: "509", flag: "🇭🇹" },
  { name: "Honduras", code: "504", flag: "🇭🇳" },
  { name: "Hong Kong", code: "852", flag: "🇭🇰" },
  { name: "Hungary", code: "36", flag: "🇭🇺" },
  { name: "Iceland", code: "354", flag: "🇮🇸" },
  { name: "India", code: "91", flag: "🇮🇳" },
  { name: "Indonesia", code: "62", flag: "🇮🇩" },
  { name: "Iran", code: "98", flag: "🇮🇷" },
  { name: "Iraq", code: "964", flag: "🇮🇶" },
  { name: "Ireland", code: "353", flag: "🇮🇪" },
  { name: "Israel", code: "972", flag: "🇮🇱" },
  { name: "Italy", code: "39", flag: "🇮🇹" },
  { name: "Jamaica", code: "1", flag: "🇯🇲" },
  { name: "Japan", code: "81", flag: "🇯🇵" },
  { name: "Jordan", code: "962", flag: "🇯🇴" },
  { name: "Kazakhstan", code: "7", flag: "🇰🇿" },
  { name: "Kenya", code: "254", flag: "🇰🇪" },
  { name: "Kiribati", code: "686", flag: "🇰🇮" },
  { name: "Kosovo", code: "383", flag: "🇽🇰" },
  { name: "Kuwait", code: "965", flag: "🇰🇼" },
  { name: "Kyrgyzstan", code: "996", flag: "🇰🇬" },
  { name: "Laos", code: "855", flag: "🇱🇦" },
  { name: "Latvia", code: "371", flag: "🇱🇻" },
  { name: "Lebanon", code: "961", flag: "🇱🇧" },
  { name: "Lesotho", code: "266", flag: "🇱🇸" },
  { name: "Liberia", code: "231", flag: "🇱🇷" },
  { name: "Libya", code: "218", flag: "🇱🇾" },
  { name: "Liechtenstein", code: "376", flag: "🇱🇮" },
  { name: "Lithuania", code: "370", flag: "🇱🇹" },
  { name: "Luxembourg", code: "352", flag: "🇱🇺" },
  { name: "Macau", code: "853", flag: "🇲🇴" },
  { name: "Madagascar", code: "261", flag: "🇲🇬" },
  { name: "Malawi", code: "265", flag: "🇲🇼" },
  { name: "Malaysia", code: "60", flag: "🇲🇾" },
  { name: "Maldives", code: "960", flag: "🇲🇻" },
  { name: "Mali", code: "223", flag: "🇲🇱" },
  { name: "Malta", code: "356", flag: "🇲🇹" },
  { name: "Marshall Islands", code: "692", flag: "🇲🇭" },
  { name: "Martinique", code: "596", flag: "🇲🇶" },
  { name: "Mauritania", code: "222", flag: "🇲🇷" },
  { name: "Mauritius", code: "230", flag: "🇲🇺" },
  { name: "Mayotte", code: "262", flag: "🇾🇹" },
  { name: "Mexico", code: "52", flag: "🇲🇽" },
  { name: "Micronesia", code: "691", flag: "🇫🇲" },
  { name: "Moldova", code: "373", flag: "🇲🇩" },
  { name: "Monaco", code: "377", flag: "🇲🇨" },
  { name: "Mongolia", code: "976", flag: "🇲🇳" },
  { name: "Montenegro", code: "382", flag: "🇲🇪" },
  { name: "Montserrat", code: "1", flag: "🇲🇸" },
  { name: "Morocco", code: "212", flag: "🇲🇦" },
  { name: "Mozambique", code: "258", flag: "🇲🇿" },
  { name: "Myanmar", code: "95", flag: "🇲🇲" },
  { name: "Namibia", code: "264", flag: "🇳🇦" },
  { name: "Nauru", code: "674", flag: "🇳🇷" },
  { name: "Nepal", code: "977", flag: "🇳🇵" },
  { name: "Netherlands", code: "31", flag: "🇳🇱" },
  { name: "New Caledonia", code: "687", flag: "🇳🇨" },
  { name: "New Zealand", code: "64", flag: "🇳🇿" },
  { name: "Nicaragua", code: "505", flag: "🇳🇮" },
  { name: "Niger", code: "227", flag: "🇳🇪" },
  { name: "Nigeria", code: "234", flag: "🇳🇬" },
  { name: "Niue", code: "683", flag: "🇳🇺" },
  { name: "North Korea", code: "850", flag: "🇰🇵" },
  { name: "North Macedonia", code: "389", flag: "🇲🇰" },
  { name: "Northern Mariana Islands", code: "1", flag: "🇲🇵" },
  { name: "Norway", code: "47", flag: "🇳🇴" },
  { name: "Oman", code: "968", flag: "🇴🇲" },
  { name: "Pakistan", code: "92", flag: "🇵🇰" },
  { name: "Palau", code: "680", flag: "🇵🇼" },
  { name: "Palestine", code: "970", flag: "🇵🇸" },
  { name: "Panama", code: "507", flag: "🇵🇦" },
  { name: "Papua New Guinea", code: "675", flag: "🇵🇬" },
  { name: "Paraguay", code: "595", flag: "🇵🇾" },
  { name: "Peru", code: "51", flag: "🇵🇪" },
  { name: "Philippines", code: "63", flag: "🇵🇭" },
  { name: "Poland", code: "48", flag: "🇵🇱" },
  { name: "Portugal", code: "351", flag: "🇵🇹" },
  { name: "Puerto Rico", code: "1", flag: "🇵🇷" },
  { name: "Qatar", code: "974", flag: "🇶🇦" },
  { name: "Réunion", code: "262", flag: "🇷🇪" },
  { name: "Romania", code: "40", flag: "🇷🇴" },
  { name: "Russia", code: "7", flag: "🇷🇺" },
  { name: "Rwanda", code: "250", flag: "🇷🇼" },
  { name: "Saint Kitts and Nevis", code: "1", flag: "🇰🇳" },
  { name: "Saint Lucia", code: "1", flag: "🇱🇨" },
  { name: "Saint Vincent and the Grenadines", code: "1", flag: "🇻🇨" },
  { name: "Samoa", code: "685", flag: "🇼🇸" },
  { name: "San Marino", code: "378", flag: "🇸🇲" },
  { name: "São Tomé and Príncipe", code: "239", flag: "🇸🇹" },
  { name: "Saudi Arabia", code: "966", flag: "🇸🇦" },
  { name: "Senegal", code: "221", flag: "🇸🇳" },
  { name: "Serbia", code: "381", flag: "🇷🇸" },
  { name: "Seychelles", code: "248", flag: "🇸🇨" },
  { name: "Sierra Leone", code: "232", flag: "🇸🇱" },
  { name: "Singapore", code: "65", flag: "🇸🇬" },
  { name: "Sint Maarten", code: "1", flag: "🇸🇽" },
  { name: "Slovakia", code: "421", flag: "🇸🇰" },
  { name: "Slovenia", code: "386", flag: "🇸🇮" },
  { name: "Solomon Islands", code: "677", flag: "🇸🇧" },
  { name: "Somalia", code: "252", flag: "🇸🇴" },
  { name: "South Africa", code: "27", flag: "🇿🇦" },
  { name: "South Korea", code: "82", flag: "🇰🇷" },
  { name: "South Sudan", code: "211", flag: "🇸🇸" },
  { name: "Spain", code: "34", flag: "🇪🇸" },
  { name: "Sri Lanka", code: "94", flag: "🇱🇰" },
  { name: "Sudan", code: "249", flag: "🇸🇩" },
  { name: "Suriname", code: "597", flag: "🇸🇷" },
  { name: "Sweden", code: "46", flag: "🇸🇪" },
  { name: "Switzerland", code: "41", flag: "🇨🇭" },
  { name: "Syria", code: "963", flag: "🇸🇾" },
  { name: "Taiwan", code: "886", flag: "🇹🇼" },
  { name: "Tajikistan", code: "992", flag: "🇹🇯" },
  { name: "Tanzania", code: "255", flag: "🇹🇿" },
  { name: "Thailand", code: "66", flag: "🇹🇭" },
  { name: "Timor-Leste", code: "670", flag: "🇹🇱" },
  { name: "Togo", code: "228", flag: "🇹🇬" },
  { name: "Tokelau", code: "690", flag: "🇹🇰" },
  { name: "Tonga", code: "676", flag: "🇹🇴" },
  { name: "Trinidad and Tobago", code: "1", flag: "🇹🇹" },
  { name: "Tunisia", code: "216", flag: "🇹🇳" },
  { name: "Turkey", code: "90", flag: "🇹🇷" },
  { name: "Turkmenistan", code: "993", flag: "🇹🇲" },
  { name: "Turks and Caicos Islands", code: "1", flag: "🇹🇨" },
  { name: "Tuvalu", code: "688", flag: "🇹🇻" },
  { name: "Uganda", code: "256", flag: "🇺🇬" },
  { name: "Ukraine", code: "380", flag: "🇺🇦" },
  { name: "United Arab Emirates", code: "971", flag: "🇦🇪" },
  { name: "United Kingdom", code: "44", flag: "🇬🇧" },
  { name: "United States", code: "1", flag: "🇺🇸" },
  { name: "Uruguay", code: "598", flag: "🇺🇾" },
  { name: "Uzbekistan", code: "998", flag: "🇺🇿" },
  { name: "Vanuatu", code: "678", flag: "🇻🇺" },
  { name: "Vatican City", code: "39", flag: "🇻🇦" },
  { name: "Venezuela", code: "58", flag: "🇻🇪" },
  { name: "Vietnam", code: "84", flag: "🇻🇳" },
  { name: "Virgin Islands (British)", code: "1", flag: "🇻🇬" },
  { name: "Virgin Islands (US)", code: "1", flag: "🇻🇮" },
  { name: "Wallis and Futuna", code: "681", flag: "🇼🇫" },
  { name: "Yemen", code: "967", flag: "🇾🇪" },
  { name: "Zambia", code: "260", flag: "🇿🇲" },
  { name: "Zimbabwe", code: "263", flag: "🇿🇼" },
];

const messageTemplates = [
  { name: "General Inquiry", text: "Hello! I'm interested in learning more about your services." },
  { name: "Customer Support", text: "Hi, I need help with my order. Order #" },
  { name: "Product Question", text: "Hi! I have a question about your products." },
  { name: "Booking/Appointment", text: "Hello, I'd like to schedule an appointment." },
  { name: "Quote Request", text: "Hi, could you please provide a quote for" },
  { name: "Follow Up", text: "Hi! Just following up on our previous conversation." },
  { name: "Thank You", text: "Thank you for your excellent service!" },
  { name: "Custom", text: "" },
];

export default function WhatsAppChatPage() {
  const tool = getToolById("whatsapp-chat");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("1");
  const [localNumber, setLocalNumber] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [error, setError] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [showHTMLCode, setShowHTMLCode] = useState(false);

  const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, "");
    
    // Remove leading country code indicators (00, +, etc.)
    if (cleaned.startsWith("00")) {
      cleaned = cleaned.substring(2);
    }
    
    return cleaned;
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const cleaned = formatPhoneNumber(phone);
    // WhatsApp requires phone numbers to be 7-15 digits (without country code indicators)
    return cleaned.length >= 7 && cleaned.length <= 15;
  };

  const handleTemplateSelect = (templateName: string) => {
    const template = messageTemplates.find(t => t.name === templateName);
    if (template && template.text) {
      setMessage(template.text);
      setSelectedTemplate(templateName);
    }
  };

  const generateWhatsAppLink = () => {
    setError("");
    
    // Use country code + local number if local number is provided, otherwise use phoneNumber field
    let fullNumber = "";
    if (localNumber.trim()) {
      const cleanedLocal = localNumber.replace(/\D/g, "");
      if (!cleanedLocal) {
        setError("Please enter a valid phone number");
        return;
      }
      fullNumber = countryCode + cleanedLocal;
    } else if (phoneNumber.trim()) {
      fullNumber = formatPhoneNumber(phoneNumber);
    } else {
      setError("Please enter a phone number");
      return;
    }

    if (!validatePhoneNumber(fullNumber)) {
      setError("Please enter a valid phone number (7-15 digits)");
      return;
    }

    let link = `https://wa.me/${fullNumber}`;
    
    if (message.trim()) {
      const encodedMessage = encodeURIComponent(message.trim());
      link += `?text=${encodedMessage}`;
    }

    setWhatsappLink(link);
    setShowQRCode(false);
    setShowHTMLCode(false);
  };

  const copyLink = () => {
    if (whatsappLink) {
      navigator.clipboard.writeText(whatsappLink);
      alert("WhatsApp link copied to clipboard!");
    }
  };

  const openWhatsApp = () => {
    if (whatsappLink) {
      window.open(whatsappLink, "_blank");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generateWhatsAppLink();
    }
  };

  const downloadQRCode = () => {
    const svg = document.getElementById("whatsapp-qrcode-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
    if (!ctx) return;
    const img = new Image();

    img.onload = () => {
      canvas.width = 256;
      canvas.height = 256;
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "whatsapp-qrcode.png";
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const getHTMLButtonCode = () => {
    const buttonText = "Chat on WhatsApp";
    const buttonColor = "#25D366";
    return `<a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: ${buttonColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-family: Arial, sans-serif;">
  ${buttonText}
</a>`;
  };

  const shareToSocial = (platform: string) => {
    const text = `Chat with me on WhatsApp: ${whatsappLink}`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(whatsappLink);

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=WhatsApp%20Chat&body=${encodedText}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank");
    }
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
                WhatsApp Chat Link Generator - Start Direct Chat
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                Generate WhatsApp direct chat links with pre-filled messages. 
                Create clickable links to start conversations instantly.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
          <ShareButtons
              title="WhatsApp Chat Link Generator"
              text="Check out this free WhatsApp chat link generator tool!"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Country Code</label>
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.name} (+{country.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-600 mb-1">Phone Number (without country code)</label>
                  <input
                    type="text"
                    value={localNumber}
                    onChange={(e) => setLocalNumber(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g., 1234567890"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xs text-slate-500 mb-2">Or enter full number:</p>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., +1234567890, 1234567890, or 001234567890"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Pre-filled Message (Optional)
              </label>
              <div className="mb-2">
                <label className="block text-xs text-slate-600 mb-1">Quick Templates</label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => {
                    if (e.target.value) {
                      handleTemplateSelect(e.target.value);
                    }
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                >
                  <option value="">Select a template...</option>
                  {messageTemplates.filter(t => t.name !== "Custom").map((template) => (
                    <option key={template.name} value={template.name}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setSelectedTemplate("");
                }}
                placeholder="Enter a message that will be pre-filled in the chat..."
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
              />
              <p className="text-xs text-slate-500 mt-1">
                This message will be automatically filled when the link is opened
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={generateWhatsAppLink}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Generate WhatsApp Link
            </button>
          </div>
        </div>

        {whatsappLink && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Your WhatsApp Link
            </h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">Link Generated Successfully!</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={whatsappLink}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-green-200 rounded text-sm text-slate-700"
                />
                <button
                  onClick={copyLink}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                  title="Copy link"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              <button
                onClick={openWhatsApp}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Open
              </button>
              <button
                onClick={() => setShowQRCode(!showQRCode)}
                className="bg-slate-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <QrCode className="w-4 h-4" />
                QR Code
              </button>
              <button
                onClick={() => setShowHTMLCode(!showHTMLCode)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Code className="w-4 h-4" />
                HTML Code
              </button>
              <button
                onClick={() => {
                  setPhoneNumber("");
                  setLocalNumber("");
                  setMessage("");
                  setWhatsappLink("");
                  setError("");
                  setShowQRCode(false);
                  setShowHTMLCode(false);
                  setSelectedTemplate("");
                }}
                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors text-sm"
              >
                Reset
              </button>
            </div>

            {showQRCode && whatsappLink && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">QR Code</h3>
                <div className="flex flex-col items-center gap-3">
                  <div id="whatsapp-qrcode-svg" className="bg-white p-3 rounded-lg">
                    <QRCodeSVG
                      value={whatsappLink}
                      size={200}
                      fgColor="#000000"
                      bgColor="#FFFFFF"
                      level="M"
                    />
                  </div>
                  <button
                    onClick={downloadQRCode}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download QR Code
                  </button>
                </div>
              </div>
            )}

            {showHTMLCode && whatsappLink && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">HTML Button Code</h3>
                <div className="bg-white border border-slate-300 rounded-lg p-3 mb-3">
                  <pre className="text-xs text-slate-700 overflow-x-auto">
                    <code>{getHTMLButtonCode()}</code>
                  </pre>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getHTMLButtonCode());
                    alert("HTML code copied to clipboard!");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
                >
                  <Copy className="w-4 h-4" />
                  Copy HTML Code
                </button>
              </div>
            )}

            <div className="border-t border-slate-200 pt-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Share Link</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => shareToSocial("twitter")}
                  className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center gap-2 text-sm"
                >
                  <Share2 className="w-4 h-4" />
                  Twitter
                </button>
                <button
                  onClick={() => shareToSocial("facebook")}
                  className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center gap-2 text-sm"
                >
                  <Share2 className="w-4 h-4" />
                  Facebook
                </button>
                <button
                  onClick={() => shareToSocial("linkedin")}
                  className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center gap-2 text-sm"
                >
                  <Share2 className="w-4 h-4" />
                  LinkedIn
                </button>
                <button
                  onClick={() => shareToSocial("email")}
                  className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center gap-2 text-sm"
                >
                  <Share2 className="w-4 h-4" />
                  Email
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Use</h2>
            <ol className="text-slate-700 space-y-2 list-decimal list-inside">
              <li>Enter the phone number with country code (e.g., 1234567890 for US numbers)</li>
              <li>Optionally add a pre-filled message that will appear when the link is opened</li>
              <li>Click "Generate WhatsApp Link" to create your direct chat link</li>
              <li>Copy the link or click "Open in WhatsApp" to start chatting</li>
              <li>Share the link on your website, social media, or via email</li>
            </ol>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Phone Number Format</h2>
            <p className="text-slate-700 mb-3 leading-relaxed">
              Enter the phone number in international format without the + sign or leading zeros:
            </p>
            <ul className="text-slate-700 space-y-2 list-disc list-inside">
              <li><strong>US/Canada:</strong> 1234567890 (10 digits)</li>
              <li><strong>UK:</strong> 447911123456 (12 digits)</li>
              <li><strong>India:</strong> 919876543210 (12 digits)</li>
              <li><strong>Other countries:</strong> Country code + number (7-15 digits total)</li>
            </ul>
            <p className="text-slate-700 mt-3 text-sm italic">
              The tool will automatically clean and format your number.
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2 text-lg">💡 Use Cases</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Add WhatsApp chat buttons to your website</li>
              <li>• Share direct contact links on social media</li>
              <li>• Include in email signatures for easy contact</li>
              <li>• Create QR codes for offline marketing materials</li>
              <li>• Pre-fill messages for customer support or inquiries</li>
              <li>• Generate links for business cards and flyers</li>
            </ul>
          </div>
        </div>

        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}

