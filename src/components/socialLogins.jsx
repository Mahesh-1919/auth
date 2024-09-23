import { doSocialLogin } from "../app/actions";

import { Github, Mail, Facebook } from "lucide-react";

const LoginForm = () => {
  return (
    <form
      action={doSocialLogin}
      className="space-y-2 mt-4 flex flex-col border-t border-zinc-400 pt-4 text-sm "
    >
      <button
        type="submit"
        name="action"
        value="google"
        variant={"outline"}
        className="flex items-center justify-center gap-2 bg-black p-2 rounded-md text-white"
      >
        <Mail size={20} /> <span>Sign In With Google</span>
      </button>

      <button
        className="flex items-center justify-center gap-2 bg-black p-2 rounded-md text-white"
        type="submit"
        name="action"
        value="github"
        variant={"outline"}
      >
        <Github size={20} /> <span>Sign In With GitHub</span>
      </button>
    </form>
  );
};

export default LoginForm;
