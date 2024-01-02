export type ChatRoomMessage = {
  sender: string;
  text: string;
  receivedAt: number
};

export type ChatReducerState = {
  roomId?: string;
  displayName?: string;
  messages: Array<ChatRoomMessage>;
};

export type ChatReducerActions =
  | {
      type: "set_display_name";
      payload: string;
    }
  | {
      type: "set_room_id";
      payload: string;
    }
  | {
      type: "on_received_message";
      payload: ChatRoomMessage;
    };

export function chatReducer(
  state: ChatReducerState,
  action: ChatReducerActions
) {
  switch (action.type) {
    case "set_display_name": {
      return {
        ...state,
        displayName: action.payload,
      };
    }
    case "set_room_id":
      return {
        ...state,
        roomId: action.payload,
      };
    case "on_received_message":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}
