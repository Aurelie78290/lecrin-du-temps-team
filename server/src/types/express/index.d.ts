// to make the file a module and avoid the TypeScript error
import type { UserAccount } from "../../modules/User/userRepository";

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: number;
        role: string;
      };
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      /* ************************************************************************* */
    }
  }
}
