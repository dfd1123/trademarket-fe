export interface GetNoticeListInput {
    offset: number;
    limit: number;
    no_type?: number;
}

export interface GetNoticeInfoInput {
    no_id: string | number;
}

export interface HitNoticeInput {
    no_id: string | number;
}

export interface NoticeInfo {
    deleted: number;
    no_content: string;
    no_date_end: string | null;
    no_date_start: string | null;
    no_file: string | null;
    no_hit: number;
    no_id: number;
    no_title: string;
    no_type: number;
    updated_at: string;
    created_at: string;
}

export interface NoticeListResponse {
    notices_count: number;
    notices: NoticeInfo[];
}