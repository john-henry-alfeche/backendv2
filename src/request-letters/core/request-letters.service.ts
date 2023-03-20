import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, UpdateResult } from 'typeorm';

@Injectable()
export class RequestLetterService {
  constructor(private readonly dataSource: DataSource) {}

  async findAllRequest(name: string) {
    const request_letter = await this.dataSource.query(
      `SELECT rl_no, requested_date, purposes, approved_id, approved_by, requested_id, requested_by from request_letter_view WHERE approved_by = @0`,
      [name],
    );

    const requestLetterItem = await Promise.all(
      request_letter.map(async (requestLetterItem: any) => {
        const { rl_no, ...rest } = requestLetterItem;
        const item = await this.dataSource.query(
          `SELECT item_code, description, quantity, rl_no from request_letter_item_view WHERE rl_no=@0`,
          [rl_no],
        );
        return { rl_no, ...rest, item };
      }),
    );

    return requestLetterItem;
  }

  async updateStatus(
    requestLetterNumber: string,
    status: string,
  ): Promise<UpdateResult> {
    try {
      const result = await this.dataSource.manager
        .createQueryBuilder()
        .update('REQUEST_LETTER_HEADER')
        .set({ status: status })
        .where('rl_no = :rl_no', { rl_no: requestLetterNumber })
        .execute();
      return result;
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}

//`SELECT * FROM TABLE WHERE ID=? AND BLA=? AND BLA=?`,
//['tae', 'shit', 'crap'],

//`SELECT * from VIEW

//SELECT rl_no, requested_date, purposes, approved_id, approved_by, requested_id, requested_by from request_letter_view

//SELECT item_code, item_desc, quantity, rl_no from request_letter_item_view
