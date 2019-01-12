export interface ResponseViewModel
{
    messages: string[];
    errorDescriptions: string[];
    success: boolean;

    new(): ResponseViewModel;

    new(message: string): ResponseViewModel;
}

export interface ResponseViewModelWithEntity extends  ResponseViewModel
{
    entity: any;

    new(): ResponseViewModelWithEntity;

    new(message: string): ResponseViewModelWithEntity;
}

export interface ResponseViewModelWithAdditionInformation extends ResponseViewModelWithEntity
{
    additionalInformation: any;

    new(): ResponseViewModelWithAdditionInformation;

    new(message: string): ResponseViewModelWithAdditionInformation;
}