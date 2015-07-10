declare module ImageResizeLinear {
    type Data = number[] | any[] | Uint8Array;
    interface IImage {
        data: Data;
        width: number;
        height: number;
        channels: number;
    }
    function linear(from: IImage, to: IImage): void;
}
export = ImageResizeLinear;
