import { BoardModel } from "./board.model"
import { UserModel } from "./user.model"

export interface BoardMemberModel {
    boardId: number
    memberId: number
    board: BoardModel
    member: UserModel
}       