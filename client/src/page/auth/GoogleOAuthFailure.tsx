import { BgPattern } from "@/components/auth-bg";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

const GoogleOAuthFailure = () => {
  const navigate = useNavigate();

  return (
    <BgPattern>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 self-center font-medium"
          >
            <Logo />
            Probe.
          </Link>
          <div className="flex flex-col gap-6"></div>
        </div>
        <Card>
          <CardContent>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h1>Authentication Failed</h1>
              <p>We couldn't sign you in with Google. Please try again.</p>

              <Button
                onClick={() => navigate("/")}
                style={{ marginTop: "20px" }}
              >
                Back to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </BgPattern>
  );
};

export default GoogleOAuthFailure;
