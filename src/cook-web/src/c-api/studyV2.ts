import { SSE } from 'sse.js';
import request from '@/lib/request';
import { tokenStore } from '@/c-service/storeUtil';
import { v4 } from 'uuid';
import { getStringEnv } from '@/c-utils/envUtils';
import { useSystemStore } from '@/c-store/useSystemStore';
import { useUserStore } from '@/store/useUserStore';

// ===== Constants  Types for shared literals =====
export const BLOCK_TYPE = {
  CONTENT: 'content',
  INTERACTION: 'interaction',
} as const;
export type BlockType = (typeof BLOCK_TYPE)[keyof typeof BLOCK_TYPE];

export const LIKE_STATUS = {
  LIKE: 'like',
  DISLIKE: 'dislike',
  NONE: 'none',
} as const;
export type LikeStatus = (typeof LIKE_STATUS)[keyof typeof LIKE_STATUS];

export const SSE_INPUT_TYPE = {
  NORMAL: 'normal',
  ASK: 'ask',
} as const;
export type SSE_INPUT_TYPE =
  (typeof SSE_INPUT_TYPE)[keyof typeof SSE_INPUT_TYPE];

export const PREVIEW_MODE = {
  COOK: 'cook',
  PREVIEW: 'preview',
  NORMAL: 'normal',
} as const;
export type PreviewMode = (typeof PREVIEW_MODE)[keyof typeof PREVIEW_MODE];

export const SSE_OUTPUT_TYPE = {
  CONTENT: 'content',
  BREAK: 'break',
  TEXT_END: 'text_end',
  INTERACTION: 'interaction',
  OUTLINE_ITEM_UPDATE: 'outline_item_update',
  PROFILE_UPDATE: 'update_user_info', // TODO: update user_info
} as const;
export type SSE_OUTPUT_TYPE =
  (typeof SSE_OUTPUT_TYPE)[keyof typeof SSE_OUTPUT_TYPE];

export const SYS_INTERACTION_TYPE = {
  PAY: '_sys_pay',
  LOGIN: '_sys_login',
  NEXT_CHAPTER: '_sys_next_chapter', // TODO: wait for backend to support
} as const;
export type SysInteractionType =
  (typeof SYS_INTERACTION_TYPE)[keyof typeof SYS_INTERACTION_TYPE];

export interface StudyRecordItem {
  block_type: BlockType;
  content: string;
  generated_block_bid: string;
  like_status?: LikeStatus;
  user_input?: string;
  isHistory?: boolean;
}

export interface LessonStudyRecords {
  mdflow: string;
  records: StudyRecordItem[];
}

export interface GetLessonStudyRecordParams {
  shifu_bid: string;
  outline_bid: string;
  // Optional preview mode flag
  preview_mode?: PreviewMode;
}

export interface PostGeneratedContentActionParams {
  shifu_bid: string;
  generated_block_bid: string;
  action: LikeStatus;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface PostGeneratedContentActionData {
  shifu_bid: string;
  generated_block_bid: string;
  action: LikeStatus;
}

export const getRunMessage = (
  shifu_bid: string,
  outline_bid: string,
  preview_mode: PreviewMode = PREVIEW_MODE.NORMAL,
  body: { input: Record<string, any> | string; [key: string]: any },
  onMessage: (data: any) => void,
) => {
  const token = useUserStore.getState().getToken();
  const payload = { ...body };

  let baseURL = getStringEnv('baseURL');
  if (baseURL === '' || baseURL === '/') {
    baseURL = window.location.origin;
  }

  // TODO: MOCK
  payload.input = Object.values(body.input).join('');
  const source = new SSE(
    `${baseURL}/api/learn/shifu/${shifu_bid}/run/${outline_bid}?preview_mode=${preview_mode}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': v4().replace(/-/g, ''),
        Authorization: `Bearer ${token}`,
        Token: token,
      },
      payload: JSON.stringify(payload),
      method: 'PUT',
    },
  );

  source.addEventListener('message', event => {
    try {
      const response = JSON.parse(event.data);
      console.log('====sse response====', response);
      if (onMessage) {
        onMessage(response);
      }
    } catch (e) {
      console.log(e);
    }
  });
  source.addEventListener('error', e => {
    console.error('[SSE error]', e);
  });
  source.addEventListener('open', () => {
    console.log('[SSE connection opened]');
  });
  source.stream();

  return source;
};

/**
 * 获取课程学习记录
 * @param {*} lessonId
 *  shifu_bid : shifu_bid
    outline_bid: 大纲bid
    preview_mode: 是否为预览模式，可选值：　cook|preview|nomal ，为空时为normal
 * @returns
 */
export const getLessonStudyRecord = async ({
  shifu_bid,
  outline_bid,
  preview_mode = PREVIEW_MODE.NORMAL,
}: GetLessonStudyRecordParams): Promise<LessonStudyRecords> => {
  return request
    .get(
      `/api/learn/shifu/${shifu_bid}/records/${outline_bid}?preview_mode=${preview_mode}`,
    )
    .catch(error => {
      // when error, return empty records, go run api
      return {
        records: [],
      };
    });
};

/**
 * 点赞/点踩 生成内容
 * shifu_bid: shifu_bid
 * generated_block_bid: 生成内容bid
 * action: 动作 like|dislike|none
 * @param params
 * @returns
 */
export async function postGeneratedContentAction(
  params: PostGeneratedContentActionParams,
): Promise<PostGeneratedContentActionData> {
  const { shifu_bid, generated_block_bid, action } = params;
  const url = `/api/learn/shifu/${shifu_bid}/generated-contents/${generated_block_bid}/${action}`;
  // Use standard request wrapper; it will return response.data when code===0
  return request.post(url, params);
}
