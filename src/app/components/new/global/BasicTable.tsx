import { cn } from "@/app/lib/utils";
import React from "react";
import styles from "@/app/styles/components/BasicTable.module.scss";
import LoaderV1 from "./LoaderV1";

type ColumnType = {
  title: string;
  dataIndex: string;
  key: string;
  align?: "left" | "right" | "center";
  render?: (value: any, row: any, index: number) => React.ReactNode;
};

type Props = {
  className?: string;
  borderless?: boolean;
  data?: any[];
  columns?: ColumnType[];
  loading?: boolean;
  emptyText?: string;
};

export default function BasicTable({
  className = "",
  borderless = false,
  data = [],
  columns = [],
  loading = false,
  emptyText = "No Data",
}: Props) {
  return loading ? (
    <LoaderV1 className="h-full" />
  ) : (
    <div className="border rounded-lg shadow-xl overflow-hidden w-full h-fit">
      <table
        className={cn(
          styles["gn-table"],
          { [styles["borderless"]]: borderless },
          "w-full",
          className
        )}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                  col.align === "left" && "text-left",
                  !col.align && "text-left"
                )}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                <LoaderV1 />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500"
              >
                {emptyText || "No data"}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={row.key || rowIndex}>
                {columns.map((col) => {
                  const value = row[col.dataIndex];
                  return (
                    <td
                      key={col.key}
                      className={cn(
                        col.align === "right" && "text-right",
                        col.align === "center" && "text-center",
                        col.align === "left" && "text-left",
                        !col.align && "text-left"
                      )}
                    >
                      {col.render ? col.render(value, row, rowIndex) : value}
                    </td>
                  );
                })}
              </tr>
            ))
          )}

          {/* {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col) => {
              const value = row[col.dataIndex];
              return (
                <td
                  key={col.key}
                  className={cn(
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center",
                    col.align === "left" && "text-left",
                    !col.align && "text-left"
                  )}
                >
                  {col.render ? col.render(value, row, rowIndex) : value}
                </td>
              );
            })}
          </tr>
        ))} */}
        </tbody>
      </table>
    </div>
  );
}
