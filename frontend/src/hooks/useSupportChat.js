import { useQuery, useMutation, useQueryClient } from 'react-query';
import apiClient from '../services/apiClient';

const useSupportChats = () => {
  return useQuery(['supportChats'], async () => {
    const res = await apiClient.get('/api/client/support-requests');
    return res.data;
  });
};

const useChatMessages = (chatId) => {
  return useQuery(['chatMessages', chatId], async () => {
    const res = await apiClient.get(`/api/common/support-requests/${chatId}/messages`);
    return res.data;
  });
};

const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (dto) => {
      const res = await apiClient.post(`/api/common/support-requests/${dto.chatId}/messages`, {
        text: dto.text,
      });
      return res.data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(['chatMessages', variables.chatId], (old) => [
          ...(old || []),
          data,
        ]);
      },
    },
  );
};