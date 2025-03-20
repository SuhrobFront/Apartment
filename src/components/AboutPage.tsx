import React from "react";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const AboutPage: React.FC = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Анна Смирнова",
      position: "Генеральный директор",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
      bio: "Более 15 лет опыта в сфере недвижимости. Основала компанию в 2010 году с целью сделать поиск жилья максимально простым и удобным.",
    },
    {
      name: "Михаил Петров",
      position: "Технический директор",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mikhail",
      bio: "Отвечает за разработку и поддержку платформы. Имеет обширный опыт в создании технологических решений для рынка недвижимости.",
    },
    {
      name: "Елена Козлова",
      position: "Руководитель отдела продаж",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
      bio: "Специалист по работе с клиентами с более чем 10-летним стажем. Помогла тысячам людей найти идеальное жилье.",
    },
    {
      name: "Дмитрий Соколов",
      position: "Главный аналитик",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry",
      bio: "Эксперт по рынку недвижимости. Проводит исследования и анализирует тенденции для предоставления клиентам самой актуальной информации.",
    },
  ];

  // Company stats
  const stats = [
    { label: "Лет на рынке", value: "13+" },
    { label: "Довольных клиентов", value: "50,000+" },
    { label: "Объектов недвижимости", value: "10,000+" },
    { label: "Городов присутствия", value: "15" },
  ];

  // Testimonials
  const testimonials = [
    {
      text: "Благодаря 'Квартира' я нашел идеальное жилье всего за неделю! Удобный интерфейс и отзывчивая поддержка сделали процесс поиска очень приятным.",
      author: "Алексей К.",
      location: "Москва",
    },
    {
      text: "Отличный сервис! Фильтры поиска позволили мне быстро найти квартиру, соответствующую всем моим требованиям. Рекомендую всем, кто ищет жилье.",
      author: "Мария Д.",
      location: "Санкт-Петербург",
    },
    {
      text: "Уже второй раз пользуюсь услугами 'Квартира' и всегда остаюсь довольна результатом. Профессиональный подход и внимание к деталям.",
      author: "Ольга В.",
      location: "Екатеринбург",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar logo="Квартира" isLoggedIn={false} />

      {/* Hero Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">О компании "Квартира"</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы помогаем людям находить идеальное жилье с 2010 года. Наша миссия
            — сделать процесс поиска и аренды квартиры максимально простым и
            удобным.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Наша история</h2>
            <p className="text-gray-600 mb-4">
              Компания "Квартира" была основана в 2010 году с целью
              революционизировать рынок аренды недвижимости в России. Мы
              начинали как небольшое агентство в Москве, но быстро выросли
              благодаря инновационному подходу и ориентированности на клиента.
            </p>
            <p className="text-gray-600 mb-4">
              В 2015 году мы запустили нашу онлайн-платформу, которая позволила
              тысячам людей находить жилье, не выходя из дома. С тех пор мы
              постоянно совершенствуем наши технологии и расширяем географию
              присутствия.
            </p>
            <p className="text-gray-600">
              Сегодня "Квартира" — это ведущая платформа для поиска жилья,
              которой доверяют более 50 000 клиентов по всей России. Мы гордимся
              тем, что помогаем людям находить дом своей мечты.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-ratio-[4/3] bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80"
                alt="Офис компании"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-lg font-bold">Основано в</p>
              <p className="text-4xl font-bold text-primary">2010</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="container mx-auto py-16 px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-6">Наша миссия и ценности</h2>
          <p className="text-gray-600">
            Мы стремимся сделать процесс поиска и аренды жилья максимально
            простым, прозрачным и удобным для всех участников рынка. Наши
            ценности определяют всё, что мы делаем.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="overflow-hidden">
            <div className="h-2 bg-blue-500"></div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">
                Клиентоориентированность
              </h3>
              <p className="text-gray-600">
                Мы всегда ставим интересы клиента на первое место. Наша цель —
                не просто помочь найти квартиру, а найти идеальное жилье,
                которое будет соответствовать всем требованиям и пожеланиям.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-2 bg-green-500"></div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Инновации</h3>
              <p className="text-gray-600">
                Мы постоянно внедряем новые технологии и улучшаем нашу
                платформу, чтобы сделать процесс поиска жилья еще более удобным
                и эффективным. Инновации — ключ к нашему успеху.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-2 bg-purple-500"></div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Прозрачность</h3>
              <p className="text-gray-600">
                Мы верим в честность и открытость во всех аспектах нашей работы.
                Клиенты всегда получают полную и достоверную информацию о жилье,
                условиях аренды и всех сопутствующих расходах.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Наша команда</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <Avatar className="h-32 w-32 mx-auto mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Что говорят наши клиенты
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.location}
                      </p>
                    </div>
                    <Badge variant="outline">Клиент</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Partners */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Наши партнеры</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex justify-center">
              <div className="h-16 w-32 bg-gray-200 rounded flex items-center justify-center">
                <p className="text-gray-500 font-medium">Партнер {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Готовы найти идеальное жилье?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Присоединяйтесь к тысячам довольных клиентов, которые уже нашли свой
            дом с помощью нашей платформы.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary text-white hover:bg-primary/90 px-8 py-2">
              Найти квартиру
            </Button>
            <Button variant="outline" className="px-8 py-2">
              Связаться с нами
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Квартира</h2>
              <p className="text-sm text-gray-500 mb-4">
                Найдите идеальную квартиру для жизни
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Компания
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Карьера
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Новости
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Контакты
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Услуги
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Аренда
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Покупка
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Продажа
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Оценка
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Поддержка
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Помощь
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Условия использования
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Политика конфиденциальности
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Квартира. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
