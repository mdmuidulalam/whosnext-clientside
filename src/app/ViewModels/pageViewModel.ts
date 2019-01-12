export class PagingViewModel
{
    PageNumber: number;
    TotalCount: number;
    NumberOfContentPerPage: number;
    SortProperty: string;
    OrderByDescending: boolean;
    SearchText: string;
    constructor() { }
}