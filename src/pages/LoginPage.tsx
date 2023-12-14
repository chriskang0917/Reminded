import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
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
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Typed from "react-typed";
import useDocTitle from "../hooks/useDocTitle";
import { authStore } from "../store/authStore";

const DEFAULT_EMAIL = "test@gmail.com";

const LoginPage = observer(() => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [loginState, setLoginState] = useState({
    newUserName: "",
    email: DEFAULT_EMAIL,
    password: "",
    isLoginPage: true,
    isSettingName: false,
  });

  useDocTitle("Reminded");
  useEffect(() => {
    if (loginState.isSettingName) {
      nameInputRef.current?.focus();
      nameInputRef.current?.select();
    }
  }, [isOpen]);

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
      setLoginState((prevState) => ({
        ...prevState,
        newUserName: authStore.name || "",
      }));
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

  const handleLoginSubmit = (e: React.FormEvent) => {
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

  const onNameSubmit = () => {
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

  const handleNameFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNameSubmit();
  };

  const handleNameSubmit = () => {
    onNameSubmit();
  };

  const handleModalClose = () => {
    onClose();
    setLoginState((prevState) => ({
      ...prevState,
      isSettingName: false,
    }));
  };

  const isRedirect = [
    authStore.uid,
    !loginState.isSettingName,
    authStore.isLogin,
  ].every((boolean) => boolean);

  if (isRedirect) return <Navigate to="/" replace />;

  const bgVideoUrl = "https://www.pexels.com/download/video/2795165/";

  const BackdropBlur = () => (
    <div className="absolute left-0 top-0 z-10 h-[100vh] w-full backdrop-blur-lg" />
  );

  return (
    <main className="flex h-[100svh] items-center justify-center">
      <div className="fixed left-0 top-0 h-[100svh] w-full bg-black backdrop-blur">
        <video
          className="absolute z-0 h-[100vh] w-[100vw] object-cover opacity-50"
          muted
          loop
          autoPlay
        >
          <source src={bgVideoUrl} type="video/mp4" />
        </video>
      </div>
      <BackdropBlur />
      <section className="relative z-20 flex h-[400px] w-4/5 max-w-[800px] justify-between gap-9">
        <Card className="w-full md:min-w-[50%]">
          <CardHeader className="flex w-full flex-col items-center">
            <h1 className="my-2 text-center text-2xl font-bold">Reminded</h1>
            <p className="text-sm md:text-medium">用靈感，開始你改變的旅程。</p>
          </CardHeader>
          <CardBody className="">
            <form onSubmit={handleLoginSubmit}>
              <div className="mx-auto flex w-5/6 flex-col gap-4">
                <Input
                  value={loginState.email}
                  placeholder="輸入你的帳號"
                  type="email"
                  label="Email"
                  onValueChange={(value) =>
                    setLoginState({ ...loginState, email: value })
                  }
                />
                <Input
                  placeholder="輸入你的密碼"
                  type="password"
                  label="Password"
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
              <span className=" text-slate-700 font-light">
                {loginState.isLoginPage
                  ? "還沒有帳號嗎？ "
                  : "已經有帳號了嗎？ "}
              </span>
              <Link
                className="cursor-pointer text-thirdDark"
                underline="hover"
                onPress={handleSwitchPage}
              >
                {!loginState.isLoginPage ? "返回登入" : "開始註冊"}
              </Link>
            </div>
          </CardFooter>
        </Card>
        <div className="hidden min-w-[50%] flex-col items-start justify-center text-3xl font-bold tracking-wide text-white md:flex">
          <h1>Reminded</h1>
          <Divider className="my-3 w-20 bg-gray-200" />
          <h1>現在，就開始</h1>
          <span className="leading-9 underline decoration-yellow-600 decoration-8">
            <Typed
              strings={[
                "捕捉生活中的靈感。",
                "寫下你的成長記錄。",
                "執行你的行動。",
                "設定你的目標。",
                "改變你的人生。",
              ]}
              typeSpeed={200}
              backSpeed={100}
              startDelay={1000}
              backDelay={1000}
              loop={true}
            />
          </span>
        </div>
      </section>
      <Modal
        backdrop="blur"
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={handleModalClose}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex justify-center">
                <h1>註冊成功！ 輸入你想使用的暱稱</h1>
              </ModalHeader>
              <ModalBody>
                <p className="text-center text-sm">
                  <strong>預設暱稱</strong>：{authStore.name}
                </p>
                <form onSubmit={handleNameFormSubmit}>
                  <Input
                    ref={nameInputRef}
                    value={loginState.newUserName}
                    onValueChange={(newUserName) =>
                      setLoginState({ ...loginState, newUserName })
                    }
                    placeholder="輸入你的暱稱"
                  />
                  <button type="submit"></button>
                </form>
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
