const payStatusColor = (pay) => {
  if (pay === 0) return { color: "#ffbf09", name: "منتظر پرداخت آنلاین شما" };
  if (pay === 1) return { color: "#ffbf09", name: "در حال اماده سازی سفارش" };
  if (pay === 2) return { color: "#ffbf09", name: "در حال بررسی" };
  if (pay === 3) return { color: "#ffbf09", name: "در حال ارسال" };
  if (pay === 4) return { color: "#ffbf09", name: "تحویل داده شده" };
  if (pay === 5) return { color: "#ffbf09", name: "کنسل شده" };
  if (pay === 6)
    return {
      color: "#ffbf09",
      name: "پرداخت ناموفق، در انتظار پرداخت شما",
    };
  if (pay === 7) return { color: "#ffbf09", name: "سفارش حذف شده است" };
};

export default payStatusColor;
