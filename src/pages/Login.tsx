import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
} from "@nextui-org/react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { authStore } from "../store/authStore";

const DEFAULT_AUTH = {
  email: "test@gmail.com",
  password: "123456",
};

const LoginPage = () => {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);
  const [auth, setAuth] = useState<{ email: string; password: string }>({
    email: DEFAULT_AUTH.email,
    password: DEFAULT_AUTH.password,
  });

  const onSubmit = () => {
    if (isLoginPage) authStore.login(auth.email, auth.password);
    if (!isLoginPage) authStore.register(auth.email, auth.password);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const handlePressSubmit = () => onSubmit();

  return (
    <main className="flex h-[100svh] items-center justify-center">
      <Toaster position="top-center" />
      <Card className="h-[400px] w-3/5 max-w-[500px]">
        <CardHeader className="flex w-full flex-col items-center">
          <h1 className="my-2 text-center text-2xl font-bold">Reminded</h1>
          <p>現在，就開始捕捉你的靈感。</p>
        </CardHeader>
        <CardBody className="">
          <form onSubmit={handleSubmit}>
            <div className="mx-auto flex w-5/6 flex-col gap-4">
              <Input
                value={auth.email}
                placeholder="輸入你的帳號"
                type="email"
                label="Email"
                isClearable
                onClear={() => setAuth({ ...auth, email: "" })}
                onValueChange={(value) => setAuth({ ...auth, email: value })}
              />
              <Input
                placeholder="輸入你的密碼"
                type="password"
                label="Password"
                isClearable
                onClear={() => setAuth({ ...auth, password: "" })}
                onValueChange={(value) => setAuth({ ...auth, password: value })}
              />
              <button type="submit"></button>
            </div>
          </form>
        </CardBody>
        <CardFooter className="my-4 flex flex-col">
          <Button className="mx-auto mb-4 w-5/6" onPress={handlePressSubmit}>
            {isLoginPage ? "登入" : "註冊"}
          </Button>
          <Link underline="hover" onPress={() => setIsLoginPage(!isLoginPage)}>
            {!isLoginPage ? "返回登入" : "開始註冊"}
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
};

export default LoginPage;
