import {
  Button,
  Card,
  DatePicker,
  Input,
  Select,
  Space,
  Tabs,
  type TabsProps,
} from "antd";
import React from "react";
import TableAdmin from "../../Components/Table";
import { ReloadOutlined, SmileOutlined, SyncOutlined } from "@ant-design/icons";
import LayoutAdmin from "../../Layout";
const { RangePicker } = DatePicker;

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Danh sách thẻ",
  },
  {
    key: "2",
    label: "Tạo và duyệt thẻ",
    children: (
      <>
        <div className="flex  justify-between gap-4">
          <div className="w-full">
            <RangePicker
              style={{ width: "100%" }}
              placeholder={["Ngày tạo", "Đến ngày"]}
            />
          </div>

          <div className="w-full">
            <Input.Search placeholder="Người tạo" style={{ width: "100%" }} />
          </div>

          <div className="w-full">
            <RangePicker
              style={{ width: "100%" }}
              placeholder={["Ngày duyệt", "Đến ngày"]}
            />
          </div>

          <div className="w-full">
            <Input.Search placeholder="Người duyệt" style={{ width: "100%" }} />
          </div>

          <div className="w-full">
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Trạng thái duyệt"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                { value: "1", label: "Not Identified" },
                { value: "2", label: "Closed" },
                { value: "3", label: "Communicated" },
                { value: "4", label: "Identified" },
                { value: "5", label: "Resolved" },
                { value: "6", label: "Cancelled" },
              ]}
            />
          </div>
        </div>
        <div className="my-4 flex justify-end">
          <div className="flex gap-2">
            <Button>Tìm kiếm</Button>
            <Button icon={<SyncOutlined />} />
          </div>
        </div>
      </>
    ),
  },
];
const onChange = (key: string) => {
  console.log(key);
};
const HomeMoney = () => {
  return (
    <>
      <div className="space-y-6">
        <div>
          <Card className="mb-10">
            <h1 className="text-xl font-semibold">Giao dịch gửi tiền</h1>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </Card>
        </div>
        <div>
          <Card>
            <TableAdmin />
          </Card>
        </div>
      </div>
    </>
  );
};

export default HomeMoney;
