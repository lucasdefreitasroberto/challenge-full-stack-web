import { Request, Response } from "express";
import { PresenterFactory } from "../../factories/presenter.factory";
import { HttpStatus } from "../../helpers/http-status-code";
import { AdminAuthService } from "@/services/auth/admin-auth.service";

export namespace AuthController {
	export const login = async (req: Request, res: Response) => {
		const result = await AdminAuthService.execute(req.body);

		return res
			.status(HttpStatus.OK)
			.send(new PresenterFactory({ data: [result] }));
	};
}
