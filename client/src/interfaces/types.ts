export interface ApiResponse {
    data: any;
    is_success: boolean;
    message: string | null;
}

export interface FileType {
    size: number;
    name: string;
    type: 'dir' | 'file';
    id: number;
  }