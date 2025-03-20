import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password, rememberMe });
    // In a real app, this would call an authentication API
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register attempt with:", {
      email: registerEmail,
      password: registerPassword,
      name: registerName,
      agreeTerms,
    });
    // In a real app, this would call a registration API
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Квартира</h1>
          <p className="mt-2 text-gray-600">Найдите идеальное жилье</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Вход в аккаунт</CardTitle>
                <CardDescription>
                  Введите свои данные для входа в систему
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium"
                      >
                        Пароль
                      </label>
                      <a
                        href="#"
                        className="text-sm text-primary hover:underline"
                      >
                        Забыли пароль?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Запомнить меня
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-primary/90"
                  >
                    Войти
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <div className="text-sm text-gray-500">
                  Нет аккаунта?{" "}
                  <a href="#" className="text-primary hover:underline">
                    Зарегистрироваться
                  </a>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Создать аккаунт</CardTitle>
                <CardDescription>
                  Заполните форму для регистрации нового аккаунта
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="register-name"
                      className="block text-sm font-medium"
                    >
                      Имя
                    </label>
                    <Input
                      id="register-name"
                      placeholder="Иван Иванов"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="register-email"
                      className="block text-sm font-medium"
                    >
                      Email
                    </label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="register-password"
                      className="block text-sm font-medium"
                    >
                      Пароль
                    </label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="register-confirm-password"
                      className="block text-sm font-medium"
                    >
                      Подтвердите пароль
                    </label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerConfirmPassword}
                      onChange={(e) =>
                        setRegisterConfirmPassword(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) =>
                        setAgreeTerms(checked as boolean)
                      }
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Я согласен с{" "}
                      <a href="#" className="text-primary hover:underline">
                        условиями использования
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-primary/90"
                  >
                    Зарегистрироваться
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <div className="text-sm text-gray-500">
                  Уже есть аккаунт?{" "}
                  <a href="#" className="text-primary hover:underline">
                    Войти
                  </a>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Или войдите через
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              Facebook
            </Button>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
