import { useRegisterQuery } from "@/auth/Auth";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { mutateAsync: queryRegister, isPending } = useRegisterQuery();
  async function submitData() {
    try {
      if (pass !== passwordConfirm) {
        return alert("Password tidak sama dengan konfirmasi password!");
      }

      await queryRegister({
        name,
        username,
        password: pass,
        confirmPassword: passwordConfirm,
      });

      alert("Register Berhasil");

      await navigate("/auth/sign-in");
    } catch (error) {
      console.log(error);
      alert("Register Gagal!");
    }
  }

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute left-2/4 top-2/4 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Name"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="username"
              label="Username"
              size="lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              size="lg"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <Input
              type="password"
              label="Konfirmasi Password"
              size="lg"
              value={passwordConfirm}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={submitData}>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
