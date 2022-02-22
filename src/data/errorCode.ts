const errorCode : Record<string, string> = {
    DEFAULT: '알 수 없는 에러가 발생했습니다.',
    BAD_REQUEST: '잘못된 요청입니다.',
    NOT_EXIST_EMAIL: '등록되지 않은 이메일 입니다.',
    UNAUTHORIZED: '비밀번호가 틀렸습니다. 다시 입력해주세요',
    BAD_VALIDATION: '입력 값이 누락되거나 잘못 입력된 부분이 있습니다.',
    INVALID_TOKEN: '유효하지 않거나 이미 만료된 토큰 값 입니다.',
    ALREADY_SOCIAL: '이 계정은 소셜 가입을 한 계정입니다. 비밀번호 찾기는 이메일로 가입한 계정만 이용 가능합니다.',
    NOT_EXIST_NOTICE: '존재하지 않는 공지글 입니다.',
    DELETED_NOTICE: '삭제된 공지글 입니다.'
}

export default errorCode;