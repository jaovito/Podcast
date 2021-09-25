"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const userExists = await this.prisma.user.findUnique({
            where: { email: createUserDto.email },
        });
        if (userExists) {
            throw new common_1.HttpException('User already exists', 400);
        }
        const hashPassword = await bcrypt.hashSync(createUserDto.password, process.env.HASH_PASSWORD);
        const user = await this.prisma.user.create({
            data: Object.assign({ password: hashPassword }, createUserDto),
        });
        return user;
    }
    async findAll() {
        const users = await this.prisma.user.findMany({
            orderBy: {
                created_at: 'asc',
            },
        });
        return users;
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.prisma.user.update({
            data: updateUserDto,
            where: { id },
        });
        return user;
    }
    async remove(id) {
        return `This action removes a #${id} user`;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map