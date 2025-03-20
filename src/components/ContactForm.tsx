import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  apartmentId?: string;
  apartmentTitle?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  title = "Оставить заявку",
  subtitle = "Заполните форму, и наш специалист свяжется с вами в ближайшее время",
  apartmentId,
  apartmentTitle,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: apartmentTitle ? `Интересует: ${apartmentTitle}` : "",
    agreement: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreement: checked }));

    if (errors.agreement) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.agreement;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Пожалуйста, введите ваше имя";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Пожалуйста, введите номер телефона";
    } else if (!/^\+?[0-9\s-()]{10,17}$/.test(formData.phone)) {
      newErrors.phone = "Пожалуйста, введите корректный номер телефона";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Пожалуйста, введите корректный email";
    }

    if (!formData.agreement) {
      newErrors.agreement = "Необходимо согласие с условиями";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after submission
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
          agreement: false,
        });

        // Reset submission status after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{subtitle}</p>

      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle2 className="text-green-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-800">
              Заявка успешно отправлена!
            </h3>
            <p className="text-green-700 text-sm">
              Наш специалист свяжется с вами в ближайшее время.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">
                Имя <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">
                Телефон <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (___) ___-__-__"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="message">Сообщение</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="agreement"
                checked={formData.agreement}
                onCheckedChange={handleCheckboxChange}
                className={errors.agreement ? "border-red-500" : ""}
              />
              <div>
                <Label htmlFor="agreement" className="text-sm font-normal">
                  Я согласен с{" "}
                  <a href="#" className="text-primary hover:underline">
                    условиями обработки
                  </a>{" "}
                  персональных данных
                </Label>
                {errors.agreement && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.agreement}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Отправка..." : "Отправить заявку"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
