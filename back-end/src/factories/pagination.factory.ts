import { PresenterFactory } from "./presenter.factory";

export class PaginationFactory extends PresenterFactory {
	public readonly pagination: { page: number; perPage: number; total: number };

	constructor(payload: {
		data: any[];
		pagination: { page: number; perPage: number; total: number };
	}) {
		super({ data: payload.data });

		const { pagination } = payload;

		this.pagination = {
			page: pagination.page,
			perPage: pagination.perPage,
			total: pagination.total,
		};
	}
}
