export interface UploadResponseModel {
	imageUrl : string;
	message ?: string;
}

export interface ChooseImageSuccessCallbackResultModel {
	tempFilePaths : string[];
	tempFiles : {
		path : string;
		size : number;
		type ?: string;
	}[];
}

export interface CropperConfirmEventModel {
	tempFilePath : string;
	[key : string] : any;
}