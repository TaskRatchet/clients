import {getUser} from "../../src/lib";
import {updateUser} from "./database";

export default async function doUpdate(
    user: string,
    token: string
): Promise<void> {
  await getUser(user, token);
  await updateUser(user, token);
}
