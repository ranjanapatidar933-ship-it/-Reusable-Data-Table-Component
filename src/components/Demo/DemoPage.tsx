
import React, { useState } from "react";
import DataTable, { type Column } from "../DataTable";
import type { User, Product } from "./mockData";
import { users, products } from "./mockData";

const DemoPage: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<User>();
    const [selectedProduct, setSelectedProduct] = useState<Product>();

    const userColumns: Column<User>[] = [
        { key: "name", label: "Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "role", label: "Role", sortable: true },
        { key: "department", label: "Department", sortable: true },
        {
            key: "salary",
            label: "Salary",
            sortable: true,
            render: (value: User["salary"],) => `$${value.toLocaleString()}`,
        },
        {
            key: "joinDate",
            label: "Join Date",
            sortable: true,
            render: (value: User["joinDate"],) =>
                new Date(value).toLocaleDateString("en-IN"),
        },
    ];

    const productColumns: Column<Product>[] = [
        { key: "name", label: "Product Name", sortable: true },
        { key: "category", label: "Category", sortable: true },
        {
            key: "price",
            label: "Price",
            sortable: true,
            render: (value: Product["price"],) => `$${value.toFixed(2)}`,
        },
        { key: "stock", label: "Stock", sortable: true },
        {
            key: "rating",
            label: "Rating",
            sortable: true,
            render: (value: Product["rating"],) => `${value}`,
        },
    ];

    return (
        <div style={{ padding: "24px" }}>
            <h2>Users Table</h2>
            <DataTable<User>
                data={users}
                columns={userColumns}
                defaultSort={{ key: "name", direction: "asc" }}
                onRowSelect={setSelectedUser}
                searchable
            />

            {selectedUser && (
                <div style={{ marginTop: 12 }}>
                    <strong>Selected User:</strong> {selectedUser.name}
                </div>
            )}

            <h2 style={{ marginTop: 40 }}>Products Table</h2>
            <DataTable<Product>
                data={products}
                columns={productColumns}
                searchable={false}
                onRowSelect={setSelectedProduct}
            />

            {selectedProduct && (
                <div style={{ marginTop: 12 }}>
                    <strong>Selected Product:</strong> {selectedProduct.name}
                </div>
            )}
        </div>
    );
};

export default DemoPage;