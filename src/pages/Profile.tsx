import { Avatar, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import useDocTitle from "../hooks/useDocTitle";
import { authStore } from "../store/authStore";

const ProfilePage = observer(() => {
  const navigate = useNavigate();

  useDocTitle("Reminded | 個人頁面");

  const handleLogout = () => {
    navigate("/login");
    authStore.logout();
  };

  return (
    <section className="-ml-48 flex items-start justify-center pt-[10svh]">
      <div className="fixed left-0 top-0 ml-20 h-[100svh] w-full rounded-[40px] bg-white" />
      <Card className="mx-auto mt-20 w-4/5 max-w-[400px] py-10">
        <CardHeader className="flex justify-center">
          <h1 className="text-xl font-bold">個人頁面</h1>
        </CardHeader>
        <CardBody className="flex flex-col items-center">
          <Avatar
            className="h-16 w-16 text-large"
            isBordered
            name={authStore.name || "UnKnown"}
          />
          <div className="item-center mb-6 flex flex-col">
            <h2 className="mt-4 text-center">{authStore.name || "User"}</h2>
            <p className="mt-2">{authStore.email || "No Email"}</p>
          </div>
          <Button onPress={handleLogout}>登出</Button>
        </CardBody>
      </Card>
    </section>
  );
});

export default ProfilePage;
