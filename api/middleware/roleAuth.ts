
/**
 * RBAC Middleware: Restricts route access to specific roles
 * Usage: router.delete('/user/:id', restrictTo('super_admin'), deleteUserController)
 */
export const restrictTo = (...allowedRoles: string[]) => {
  return (req: any, res: any, next: any) => {
    // req.user is populated by the protect/auth middleware
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied: You do not have permission to perform this node operation."
      });
    }
    next();
  };
};
