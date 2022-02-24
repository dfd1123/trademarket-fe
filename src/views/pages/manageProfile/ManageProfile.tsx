import basicProfile from '@/assets/img/kmf/basicProfile.jpeg';
import icoFindImg from '@/assets/img/kmf/ico/ico-img-find.svg';
import BasicButton from '@/views/components/common/Button';
import DateSelectInput from '@/views/components/common/input/DateSelectInput';
import { BasicInput } from '@/views/components/common/input/TextInput';
import KmfImageViewer from '@/views/components/common/kmf/KmfImageViewer';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import React, { useReducer, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ProfileInput } from '@/services/types/User';
import useService from '@/hooks/useService';
import { useTypedSelector } from '@/store/index';

const initialState: ProfileInput = {
  id: '',
  name: '',
  birth: '',
  phone: '',
  company: '',
  address1: '',
  address2: '',
  manage_artist: '',
};

const ManageProfile = () => {
  const [imgUrl, setImgUrl] = useState(basicProfile);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const userData = useTypedSelector((state) => state.authSlice);
  const [userInfo, setUserInfo] = useState(initialState);
  const loginOs = window.navigator.userAgent;
  const service = useService();

  const handleChangeFile = (e: any) => {
    if (!e?.target?.files) return;
    const imgFile = e.target.files[0];
    console.log('imgFile', e.target);
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const imgBase64 = typeof reader.result === 'string' ? reader.result : '';
      setImgUrl(imgBase64);
    };
    reader.readAsDataURL(imgFile);
  };

  const getUserInfo = async (id: number) => {
    const result = await service.user.getProfile({ id: id });
    delete result.user.association;
    delete result.user.cardinal_num;
    delete result.user.status;
    setUserInfo({ ...result.user, id: String(id) });
    console.log('user info', result.user, result.user.birth);
  };

  const onChangeHandler = (name: string, payload: any) => {
    setUserInfo({ ...userInfo, [name]: payload });
  };

  const onSave = async () => {
    console.log('onSave', userInfo);
    const result = { ...userInfo, profile_img: '' };
    console.log(result);
    await service.user.modifyProfile(result);
  };

  useEffect(() => {
    console.log('os', loginOs);
    console.log('user data', userData);
    userData?.user?.id ? getUserInfo(userData.user.id) : null;
  }, []);

  useEffect(() => {
    console.log('user info changed', userInfo);
  }, [userInfo]);

  return (
    <ContainerStyle>
      <KmfHeader headerText={'프로필관리'} prev />
      <ContentWrapperStyle>
        <KmfImageViewer imgUrl={imgUrl} width="100%" height="262px">
          <input
            type="file"
            accept="image/*"
            name="profile_img[]"
            hidden
            ref={inputRef}
            onChange={handleChangeFile}
          />
          <FindImage
            className="find-img"
            imgUrl={icoFindImg}
            onClick={() => {
              console.log('ref', inputRef);
              inputRef?.current?.click();
            }}
          />
        </KmfImageViewer>
        <div className="input-form">
          <p className="title">기본정보</p>
          <BasicInput
            className="text-input input-name"
            name="name"
            placeholder="이름을 입력해주세요."
            label="이름"
            value={userInfo.name}
            onChange={(e: React.ChangeEvent) => onChangeHandler('name', e)}
          />
          <DateSelectInput
            className="text-input"
            name="birth"
            placeholder="날짜를 선택해주세요."
            label="생년월일"
            value={userInfo.birth}
            onChange={(e: any) => onChangeHandler('birth', e)}
          />
          <BasicInput
            className="text-input"
            name="phone"
            placeholder="숫자만 입력해주세요."
            label="연락처"
            value={userInfo.phone}
            onChange={(e: React.ChangeEvent) => onChangeHandler('phone', e)}
            number
          />
          <p className="title info">소속사 정보</p>
          <BasicInput
            className="text-input input-company"
            name="company"
            placeholder=""
            label="현재 소속사"
            value={userInfo.company}
            onChange={(e: React.ChangeEvent) => onChangeHandler('company', e)}
          />
          <BasicInput
            className="text-input input-address"
            name="address"
            placeholder="주소를 검색해주세요."
            label="소속사 주소"
            value={userInfo.address1}
            onChange={(e: React.ChangeEvent) => onChangeHandler('address1', e)}
          />
          <BasicInput
            className="text-input input-full-address"
            name="full-address"
            placeholder="상세주소를 입력해주세요."
            value={userInfo.address2}
            onChange={(e: React.ChangeEvent) => onChangeHandler('address2', e)}
          />
          <BasicInput
            className="text-input input-artist"
            name="artist"
            placeholder="담당 아티스트명을 알려주세요."
            label="담당 아티스트"
            value={userInfo.manage_artist}
            onChange={(e: React.ChangeEvent) =>
              onChangeHandler('manage_artist', e)
            }
          />

          <p className="title info">등록정보</p>
          <p className="id">아이디</p>
          <p className="email">asdf@naver.com</p>
          <div className="kmf-fighting">
            KMF 화이팅!{' '}
            {loginOs.includes('Android')
              ? 'Android'
              : loginOs.includes('iOS')
              ? 'iOS'
              : null}
          </div>
        </div>
      </ContentWrapperStyle>
      <BasicButton className="footer-btn" onClick={onSave}>
        저장하기
      </BasicButton>
    </ContainerStyle>
  );
};

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;

  .footer-btn {
    height: 78px;
    display: flex;
    justify-content: center;
    background-color: #1574bd;
    color: white;
    font-size: 20px;
  }
`;

const ContentWrapperStyle = styled.section`
  height: calc(100vh - 46px - 78px);
  overflow: scroll;
  font-size: 14px;
  line-height: 20px;

  .input-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;

    .title {
      font-size: 12px;
      margin-bottom: 14px;
    }

    .info {
      margin-top: 20px;
    }
  }

  .text-input {
    width: 100%;
    margin-bottom: 14px;

    input {
      width: 100%;
    }

    label {
      font-size: 14px;
      color: #1e1e1e;
    }

    input[name~='address'] {
      margin-bottom: -6px;
    }
  }

  .input-name {
    label {
      font-size: 12px;
    }
  }

  .id {
    font-size: 14px;
    color: #787878;
  }

  .email {
    font-size: 16px;
    color: black;
    margin: 14px 0 0 14px;
  }

  .kmf-fighting {
    padding: 20px;
    text-align: center;
    color: #acacac;
    margin-top: auto;
  }

  ${BasicButton} {
    display: flex;
    height: 60px;
    width: 100%;
    background-color: #1574bd;
    justify-content: center;
    align-items: center;
    border-radius: 0 !important;

    > button {
      color: white;
      font-size: 17px;
      font-weight: 500;
    }
  }
`;

const FindImage = styled.div<{ imgUrl?: string }>`
  width: 40px;
  height: 40px;
  position: absolute;
  border-radius: 20px;
  top: 111px;
  left: calc(50% - 20px);
  z-index: 1;
  display: flex;
  background-image: url(${(props) => props.imgUrl});
  background-size: 40px;
  background-repeat: no-repeat;

  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export default ManageProfile;
