'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
    name :'Hến',
    categoriesId :  4,
    picture:'https://media-ak.static-adayroi.com/400_400/80/h7d/h4e/9623097507870.jpg',
    price: 16800 ,
    description:'Sản phẩm có thể cắt nhỏ hoặc làm sạch tùy vào khối lượng',
    detail:'Các thực phẩm tươi do VinMart cung cấp luôn được chọn lọc kỹ càng từ những cơ sở uy tín, đảm bảo vệ sinh an toàn vệ sinh. Sản phẩm Hến được lấy từ nguồn nguyên liệu tươi sống nên giữ nguyên các giá trị dinh dưỡng vốn có. Bạn có thể chế biến được nhiều món ăn ngon từ hến như hến xào xả ớt, hến chiên trứng, chả hến... đặc biệt nước nấu từ hến rất ngon và ngọt vị, bạn có thể chế biến thành các món đơn giản mà bỗ dưỡng, ngon miệng như canh rau muống hến, cháo hến... Thịt hến có vị rất ngon, lại chứa protein, mỡ, đường, muối vô cơ, vitamin A, B2, i-ốt... Vì vậy, những người đang trong độ tuổi thanh xuân, phụ nữ thai nghén, người lao động khỏe mạnh nên ăn để bồi dưỡng cơ thể. Bên cạnh đó, hến cũng chứa ít chất béo, ít cholesterol và nhiều axit béo omega 3 nên là món ăn tích cực cho những người có bệnh tim mạch.',
    order_time: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Products', null, {});
  }
};
