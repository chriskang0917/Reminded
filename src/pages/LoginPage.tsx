import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { authStore } from "../store/authStore";

const DEFAULT_EMAIL = "test@gmail.com";

const LoginPage = observer(() => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [loginState, setLoginState] = useState({
    newUserName: "",
    email: DEFAULT_EMAIL,
    password: "",
    isLoginPage: true,
    isSettingName: false,
  });

  const onLoginSubmit = () => {
    if (loginState.isLoginPage) {
      return authStore.login(loginState.email, loginState.password);
    }
    if (!loginState.email || !loginState.password) {
      return toast.error("請輸入完整的帳號密碼");
    }

    const registerCallback = (result?: string) => {
      if (result === "error") return;
      onOpen();
    };
    setLoginState((prevState) => ({
      ...prevState,
      isSettingName: true,
    }));
    authStore.register(loginState.email, loginState.password, registerCallback);
  };

  const handleLoginPressSubmit = () => {
    onLoginSubmit();
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLoginSubmit();
  };

  const handleSwitchPage = () => {
    setLoginState((prevState) => ({
      ...prevState,
      isLoginPage: !prevState.isLoginPage,
    }));
  };

  const handleNameClose = () => {
    onClose();
    setLoginState((prevState) => ({
      ...prevState,
      isSettingName: false,
    }));
  };

  const handleNameSubmit = () => {
    if (!loginState.newUserName) {
      return toast.error("請輸入暱稱");
    }
    authStore.updateProfile({
      name: loginState.newUserName,
      email: loginState.email,
    });
    setLoginState((prevState) => ({
      ...prevState,
      isSettingName: false,
    }));
    onClose();
  };

  const isRedirect = [
    authStore.uid !== "",
    !loginState.isSettingName,
    authStore.isLogin,
  ].every((boolean) => boolean);

  if (isRedirect) return <Navigate to="/" replace />;

  return (
    <main className="flex h-[100svh] items-center justify-center">
      <Toaster position="top-center" />
      <Card className="h-[400px] w-3/5 max-w-[500px]">
        <CardHeader className="flex w-full flex-col items-center">
          <h1 className="my-2 text-center text-2xl font-bold">Reminded</h1>
          <p>現在，就開始捕捉你的靈感。</p>
        </CardHeader>
        <CardBody className="">
          <form onSubmit={handleLoginSubmit}>
            <div className="mx-auto flex w-5/6 flex-col gap-4">
              <Input
                value={loginState.email}
                placeholder="輸入你的帳號"
                type="email"
                label="Email"
                isClearable
                onClear={() => setLoginState({ ...loginState, email: "" })}
                onValueChange={(value) =>
                  setLoginState({ ...loginState, email: value })
                }
              />
              <Input
                placeholder="輸入你的密碼"
                type="password"
                label="Password"
                isClearable
                onClear={() => setLoginState({ ...loginState, password: "" })}
                onValueChange={(value) =>
                  setLoginState({ ...loginState, password: value })
                }
              />
              <button type="submit"></button>
            </div>
          </form>
        </CardBody>
        <CardFooter className="my-4 flex flex-col">
          <Button
            className="mx-auto mb-4 w-5/6"
            onPress={handleLoginPressSubmit}
          >
            {loginState.isLoginPage ? "登入" : "註冊"}
          </Button>
          <div>
            <span className=" font-light text-slate-700">
              {loginState.isLoginPage ? "還沒有帳號嗎？ " : "已經有帳號了嗎？ "}
            </span>
            <Link
              className="cursor-pointer"
              underline="hover"
              onPress={handleSwitchPage}
            >
              {!loginState.isLoginPage ? "返回登入" : "開始註冊"}
            </Link>
          </div>
        </CardFooter>
      </Card>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex justify-center">
                <h1>註冊成功！ 輸入你想使用的暱稱</h1>
              </ModalHeader>
              <ModalBody>
                <Input
                  value={loginState.newUserName}
                  onValueChange={(newUserName) =>
                    setLoginState({ ...loginState, newUserName })
                  }
                  placeholder="輸入你的暱稱"
                />
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button
                  color="warning"
                  variant="ghost"
                  onPress={handleNameClose}
                >
                  略過
                </Button>
                <Button color="success" onPress={handleNameSubmit}>
                  確認
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
});

export default LoginPage;
