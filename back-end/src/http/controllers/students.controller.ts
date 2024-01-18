import { Request, Response } from "express";
import { PresenterFactory } from "../../factories/presenter.factory";
import { CreateStudentService } from "../../services/students/create-student.service";
import { UpdateStudentService } from "../../services/students/update-student.service";
import { ListStudentService } from "../../services/students/list-student.service";
import { DeleteStudentService } from "../../services/students/delete-student.service";
import { GetStudentService } from "../../services/students/get-student.service";
import { HttpStatus } from "../../helpers/http-status-code";
import { PaginationFactory } from "@/factories/pagination.factory";

export namespace StudentsController {
	export const getOne = async (req: Request, res: Response) => {
		const result = await GetStudentService.execute(+req.params.id);
		return res
			.status(HttpStatus.OK)
			.send(new PresenterFactory({ data: [result] }));
	};

	export const list = async (req: Request, res: Response) => {
		const page: number = Number(req.query.page);
		const perPage: number = Number(req.query.perPage);

		const result = await ListStudentService.execute(
			{ page, perPage },
			req.query.search as string
		);

		return res.status(HttpStatus.OK).send(
			new PaginationFactory({
				pagination: {
					page,
					perPage,
					total: result.count,
				},
				data: result.students,
			})
		);
	};

	export const create = async (req: Request, res: Response) => {
		const result = await CreateStudentService.execute(req.body);
		return res
			.status(HttpStatus.OK)
			.send(new PresenterFactory({ data: [result] }));
	};

	export const update = async (req: Request, res: Response) => {
		const result = await UpdateStudentService.execute(+req.params.id, req.body);
		return res
			.status(HttpStatus.OK)
			.send(
				new PresenterFactory({ data: [result], message: ["student updated"] })
			);
	};

	export const destroy = async (req: Request, res: Response) => {
		const result = await DeleteStudentService.execute(+req.params.id);
		return res
			.status(HttpStatus.OK)
			.send(
				new PresenterFactory({ data: [result], message: ["student deleted"] })
			);
	};
}
