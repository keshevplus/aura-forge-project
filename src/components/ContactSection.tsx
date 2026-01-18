import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { Section, SectionHeader } from '@/components/layout/Section';
import { AccessibleButton } from '@/components/ui/accessible-button';
import { contentApi, useContent, type ContactInfo } from '@/lib/content';
import { cn } from '@/lib/utils';
import { z } from 'zod';

/**
 * ContactSection - Accessible, mobile-first contact form
 * 
 * UX Improvements:
 * - Single-column form on mobile
 * - Large input fields with proper labels
 * - Clear validation messages
 * - Touch-friendly buttons (min 44px)
 * - Progressive disclosure
 * - Data-driven contact info from API
 */

// Validation schema
const contactSchema = z.object({
  name: z.string().trim().min(2, { message: 'Name must be at least 2 characters' }).max(100),
  phone: z.string().trim().min(9, { message: 'Please enter a valid phone number' }).max(20),
  email: z.string().trim().email({ message: 'Please enter a valid email' }).optional().or(z.literal('')),
  message: z.string().trim().min(10, { message: 'Message must be at least 10 characters' }).max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Icon mapping
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  phone: Phone,
  email: Mail,
  address: MapPin,
  hours: Clock,
};

const ContactSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const isRTL = language === 'he';
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  // Fetch contact info from API
  const { data: contactInfo } = useContent(
    () => contentApi.getContactInfo(),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const validData = {
        name: result.data.name,
        phone: result.data.phone,
        email: result.data.email,
        message: result.data.message,
      };
      const response = await contentApi.submitContactForm(validData);
      
      if (response.success) {
        setIsSubmitted(true);
        toast({
          title: isRTL ? 'הודעה נשלחה בהצלחה!' : 'Message sent successfully!',
          description: isRTL ? 'נחזור אליכם בהקדם' : "We'll get back to you soon",
        });
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: isRTL ? 'שגיאה בשליחה' : 'Error sending message',
        description: isRTL ? 'אנא נסו שוב' : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section 
      id="contact" 
      background="muted"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-labelledby="contact-heading"
    >
      <SectionHeader 
        title={t('contact.title')} 
        subtitle={isRTL 
          ? 'נשמח לשמוע מכם ולענות על כל שאלה'
          : "We'd love to hear from you and answer any questions"
        }
        titleId="contact-heading"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {isRTL ? 'פרטי התקשרות' : 'Contact Information'}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {isRTL 
                ? 'צרו איתנו קשר בכל דרך שנוחה לכם - נשמח לעזור'
                : 'Reach out to us in any way convenient for you - we\'re here to help'}
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactInfo?.map((info, index) => {
              const IconComponent = iconMap[info.type] || Phone;
              
              return (
                <motion.div
                  key={info.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-gray-100 hover:shadow-md transition-shadow">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-green-50 shrink-0">
                          <IconComponent className="w-5 h-5 text-green-700" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">
                            {info.label[language]}
                          </h4>
                          {info.type === 'phone' ? (
                            <a 
                              href={`tel:${info.value}`}
                              className="font-semibold text-green-700 hover:text-green-800 transition-colors block truncate"
                            >
                              {info.value}
                            </a>
                          ) : info.type === 'email' ? (
                            <a 
                              href={`mailto:${info.value}`}
                              className="font-semibold text-green-700 hover:text-green-800 transition-colors block truncate"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="font-semibold text-foreground truncate">
                              {info.value}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Direct Call CTA - Prominent on mobile */}
          <motion.a
            href="tel:055-27-399-27"
            className={cn(
              "flex items-center justify-center gap-3 w-full",
              "py-4 px-6 rounded-xl",
              "bg-green-700 text-white font-semibold text-lg",
              "hover:bg-green-800 transition-colors",
              "shadow-md hover:shadow-lg",
              "min-h-[56px]",
              "lg:hidden" // Only show prominently on mobile
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            <span>{isRTL ? 'התקשרו עכשיו' : 'Call Now'}</span>
          </motion.a>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="border-gray-100 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">
                {isRTL ? 'השאירו פרטים ונחזור אליכם' : 'Leave your details and we\'ll get back to you'}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {isRTL ? 'תודה שפניתם אלינו!' : 'Thank you for contacting us!'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isRTL ? 'נחזור אליכם בהקדם האפשרי' : "We'll get back to you as soon as possible"}
                  </p>
                  <AccessibleButton
                    variant="outline"
                    className="mt-6"
                    onClick={() => setIsSubmitted(false)}
                  >
                    {isRTL ? 'שליחת הודעה נוספת' : 'Send another message'}
                  </AccessibleButton>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium">
                      {isRTL ? 'שם מלא' : 'Full Name'} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={isRTL ? 'הכניסו את שמכם המלא' : 'Enter your full name'}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={cn(
                        "h-12 text-base",
                        errors.name && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-sm text-red-600" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-medium">
                      {isRTL ? 'טלפון' : 'Phone'} *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={isRTL ? '050-000-0000' : '050-000-0000'}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      className={cn(
                        "h-12 text-base",
                        errors.phone && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-sm text-red-600" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email Field - Optional */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                      {isRTL ? 'דוא"ל (אופציונלי)' : 'Email (optional)'}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={isRTL ? 'your@email.com' : 'your@email.com'}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={cn(
                        "h-12 text-base",
                        errors.email && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-red-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base font-medium">
                      {isRTL ? 'הודעה' : 'Message'} *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={isRTL ? 'ספרו לנו במה נוכל לעזור...' : 'Tell us how we can help...'}
                      rows={4}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={cn(
                        "text-base resize-none",
                        errors.message && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-sm text-red-600" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <AccessibleButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    loadingText={isRTL ? 'שולח...' : 'Sending...'}
                    className="mt-6"
                  >
                    <Send className="w-5 h-5" aria-hidden="true" />
                    {isRTL ? 'שליחת הודעה' : 'Send Message'}
                  </AccessibleButton>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    {isRTL 
                      ? 'המידע שלכם מאובטח ולא ישותף עם צדדים שלישיים'
                      : 'Your information is secure and will not be shared with third parties'}
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
};

export default ContactSection;
