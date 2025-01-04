class Student {
    constructor(mssv, hoTen, cpa) {
        this.mssv = mssv;
        this.hoTen = hoTen;
        this.cpa = cpa;
    }
    get mucCanhCao (){
        if (this.cpa <= 0.5) return 3;
        if (this.cpa > 0.5 && this.cpa <= 1.0) return 2;
        if (this.cpa > 1.0 && this.cpa <= 1.5) return 1;
        return 0;
    }
}
class QuanLySinhVien {
    constructor (){
        this.danhSachSinhVien = [];
    }

    async themSinhVien (sinhVien) {
        this.danhSachSinhVien.push(sinhVien);
    }

    async list(){
        this.danhSachSinhVien.forEach(sv => console.log(`${sv.mssv} "${sv.hoTen}"`));

    }
    
    async find(mssv) {
        const sv = this.danhSachSinhVien.find(sv => sv.mssv === mssv);
        if (sv){
            console.log(`${sv.mssv} "${sv.hoTen}" ${sv.mucCanhCao}`);
            return sv;
        }
        return undefined;
    }

    async modifyCpa(mssv, cpaMoi) {
        const sv = this.danhSachSinhVien.find(sv => sv.mssv === mssv);
        if (sv){
            sv.cpa = cpaMoi;
        }
    }

    async findTop(n) {
        return [...this.danhSachSinhVien]
            .sort((a, b) => b.cpa - a.cpa)
            .slice(0, n)
            .map(sv => sv.mssv);
    }

    async findBottom(n){
        return [...this.danhSachSinhVien]
            .sort((a, b) => a.cpa - b.cpa)
            .slice(0, n)
            .map(sv => sv.mssv);
    }

    async findCanhCao(){
        return this.danhSachSinhVien.filter(sv => sv.mucCanhCao > 0);
    }

    async count(a, b) {
        return this.danhSachSinhVien.filter(sv => sv.cpa >= a && sv.cpa <= b).length;
    }

    async dinhChiHoc(){
        const namHienTai = 2025;
        return this.danhSachSinhVien.filter(sv => {
            const namNhapHoc = parseInt(sv.mssv.substring(0,4));
            return sv.mucCanhCao === 3 && (namHienTai - namNhapHoc) > 5;
        });
    }
}
const qlsv = new QuanLySinhVien();
function createStudent(mssv, hoTen, cpa) {
    return new Student(mssv, hoTen, cpa);
}


const sinhVienData = [
    createStudent("20201234", "Nguyen Van A", 1.2),
    createStudent("20211235", "Le Thi B", 0.4),
    createStudent("20191236", "Tran Van C", 1.6),
    createStudent("20181237", "Pham Thi D", 0.9),
    createStudent("20171238", "Do Van E", 0.3),
    createStudent("20221239", "Nguyen Thi F", 2.0),
    createStudent("20161240", "Hoang Van G", 0.5),
    createStudent("20151241", "Bui Thi H", 1.3),
    createStudent("20231242", "Vu Van I", 2.5),
    createStudent("20141243", "Tran Thi K", 0.8),
];


// Thêm dữ liệu sinh viên vào hệ thống quản lý
for (const sv of sinhVienData) {
    await qlsv.themSinhVien(sv);
}


// Kiểm tra danh sách sinh viên
//ait qlsv.list();

 //Tìm sinh viên với MSSV cụ thể
//const CanTim = "20211235";
// const sinhVien = await qlsv.find(mssvCanTim);
// if (sinhVien) {
//   console.log("Thông tin sinh viên tìm được:");
//   console.log(`${sinhVien.mssv} - ${sinhVien.hoTen} - CPA: ${sinhVien.cpa} - Mức cảnh cáo: ${sinhVien.mucCanhCao}`);
// } else {
//    console.log(`Không tìm thấy sinh viên có MSSV: ${mssvCanTim}`);//
//}


// MSSV của sinh viên cần thay đổi CPA
const mssvCanSua = "20211235";
// CPA mới muốn thay đổi
const cpaMoi = 1.8;
await qlsv.modifyCpa(mssvCanSua, cpaMoi);
// Khai báo biến MSSV cần tìm
const mssvCanTim = "20211235"; 

const sinhVien = await qlsv.find(mssvCanTim);

if (sinhVien) {
    console.log("Thông tin sinh viên tìm được:");
    console.log(`${sinhVien.mssv} - ${sinhVien.hoTen} - CPA: ${sinhVien.cpa} - Mức cảnh cáo: ${sinhVien.mucCanhCao}`);
} else {
    console.log(`Không tìm thấy sinh viên có MSSV: ${mssvCanTim}`);
}


//console.log("Top 3 sinh viên có CPA cao nhất:");
//console.log(await qlsv.findTop(3));


//console.log("\nSinh viên cần cảnh cáo học tập:");
//console.log(await qlsv.findCanhCao());

//console.log("Top 2 sinh viên có CPA thấp nhất:");
//console.log(await qlsv.findBottom(2));

// Đếm số lượng sinh viên có CPA trong khoảng [1.0, 2.5]
//const soLuong = await qlsv.count(1.0, 2.5);
//console.log('Số lượng sinh viên có CPA trong khoảng [1.0, 2.5]:', soLuong);


// Tính số lượng sinh viên bị đình chỉ
//    const dinhChi = await qlsv.dinhChiHoc();
//    console.log('Số lượng sinh viên bị đình chỉ học:', dinhChi.length);
//    console.log('Danh sách sinh viên bị đình chỉ:', dinhChi);

