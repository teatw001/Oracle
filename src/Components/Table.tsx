/* eslint-disable compat/compat */
import React, { useEffect, useState } from "react";
import type { GetProp, TableProps } from "antd";
import { Button, Input, Modal, Table, Tag, Tooltip, Typography } from "antd";
import type { AnyObject } from "antd/es/_util/type";
import type { SorterResult } from "antd/es/table/interface";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { Form } from "react-router-dom";
import ATMModal from "./ATMModal";
import ModalConfilm from "./ModalConfilm";
import AddNv from "./AddNv";
type ColumnsType<T extends object = object> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface DataType {
  name: string;
  gender: string;
  email: string;
  id: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}
interface TableAdminProps {
  data: any[];
  columns: ColumnsType<any>;
  prop?: { nhanvien?: boolean; atm?: boolean };
}
const TableAdmin: React.FC<TableAdminProps> = ({ data, columns, prop }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // reject
  const [isModalOpenReject, setIsModalOpenReject] = useState(false);
  const [open, setOpen] = useState(false);
  const [openATM, setOpenATM] = useState(false);
  const [openConfilm, setOpenConfilm] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModalReject = () => {
    setIsModalOpenReject(true);
  };

  const handleOkReject = () => {
    setIsModalOpenReject(false);
  };

  const handleCancelReject = () => {
    setIsModalOpenReject(false);
  };

  const { Text } = Typography;
  // const data = Array.from({ length: 7 }, (_, index) => ({
  //   key: index + 1,
  //   stt: index + 1,
  //   maThe: "123123123123",
  //   tenChuThe: "Trần Thịnh Vượng",
  //   nhanVien: "Trần Thịnh Vượng",
  //   sdt: "123123123",
  //   ngayTao: "12/12/2023 12:20:12",
  //   lyDo: "Checker nhập",
  //   trangThai: "Từ chối",
  // }));

  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const handleTableChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <Table<DataType>
        columns={columns as any}
        rowKey={(record) => record.id}
        dataSource={data as any}
        pagination={{
          ...tableParams.pagination,
          total: data?.length,
          showSizeChanger: true,
          pageSizeOptions: ["5", "20", "50"],
          showTotal: (total, range) =>
            `Hiển thị ${range[0]} đến ${range[1]} trên ${total} kết quả`,
        }}
        loading={loading}
        onChange={handleTableChange}
        className="w-full max-w-6xl"
        title={() => (
          <>
            <div className="flex justify-end items-center">
              <div className="">
                {prop?.atm && (
                  <Button
                    style={{ border: "1px solid #28a745 ", color: "" }}
                    className="!text-[#28a745]"
                    onClick={() => setOpenATM(true)}
                  >
                    Tạo thẻ
                  </Button>
                )}
                {prop?.nhanvien && (
                  <Button
                    style={{ border: "1px solid #28a745 ", color: "" }}
                    className="!text-[#28a745]"
                    onClick={() => setOpen(true)}
                  >
                    Thêm nhân viên
                  </Button>
                )}

                <ModalConfilm
                  open={openConfilm}
                  onCancel={() => setOpenConfilm(false)}
                  onOk={() => {
                    // Xử lý thực hiện
                    setOpenConfilm(false);
                  }}
                />
                <AddNv
                  open={open}
                  onCancel={() => setOpen(false)}
                  onOk={() => {
                    // Xử lý thực hiện
                    setOpen(false);
                  }}
                />
                <ATMModal
                  open={openATM}
                  onCancel={() => setOpenATM(false)}
                  onOk={() => {
                    // Xử lý thực hiện
                    setOpenATM(false);
                  }}
                />
              </div>
            </div>
          </>
        )}
      />
      <Modal
        width={360}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Đóng
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{ backgroundColor: "#28a745", borderColor: "#28a745" }} // ✅ xanh lá
            onClick={handleOk}
          >
            Duyệt
          </Button>,
        ]}
      >
        <div className="flex items-start gap-2 mb-2">
          <CheckCircleOutlined style={{ color: "#28a745", fontSize: 20 }} />
          <Text strong>Xác nhận duyệt</Text>
        </div>
        <Text>Bạn chắc chắn muốn duyệt?</Text>
      </Modal>
      <Modal
        title="Từ chối"
        open={isModalOpenReject}
        onCancel={handleCancelReject}
        footer={[
          <Button key="back" onClick={handleCancelReject}>
            Đóng
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            onClick={handleCancelReject}
          >
            Xác nhận từ chối
          </Button>,
        ]}
      >
        <div className="flex flex-col gap-2 mt-2">
          <label className=" font-medium">
            <span className="text-red-500">* </span>
            <span>Lý do từ chối</span>
          </label>
          <Input.TextArea
            rows={4}
            placeholder="Nhập lý do"
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default TableAdmin;
