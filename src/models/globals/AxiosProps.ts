import { AxiosRequestConfig } from "axios";

export interface UseGetAxiosProps {
  config: AxiosRequestConfig;
  queryKey: readonly any[];
  removeQueryKey?: readonly any[];
  invalidateQueryKey?: readonly any[];
  queryParams?: any;
  enabled?: boolean;
}

export interface UseAxiosPostPatchProps<T> {
  config: (id?: string, id2?: string) => AxiosRequestConfig<any>;
  data?: T;
  queryParams?: any;
  onSuccess?: (data?: T) => void;
  removeQueryKey?: readonly any[];
  removeType?: "all" | "active" | "inactive";
  invalidateType?: "all" | "active" | "inactive";
  invalidateQueryKey?: readonly any[];
  redirect?: string;
}

export interface UseAxiosDeleteProps {
  config: (id?: string, id2?: string) => AxiosRequestConfig<any>;
  queryParams?: any;
  onSuccess?: () => void;
  removeQueryKey?: readonly any[];
  removeType?: "all" | "active" | "inactive";
  invalidateType?: "all" | "active" | "inactive";
  invalidateQueryKey?: readonly any[];
  redirect?: string;
}

export interface TargetIdDto {
  id?: string;
  id2?: string;
}

export interface PostPatchDto<T> extends TargetIdDto {
  data?: T;
}

export interface DeleteDto extends TargetIdDto {}
